const phantom = require('phantom');
const fs = require('fs');
const parser = require('./parser');

module.exports.startCrawler = () => {

    (async function () {
        const instance = await phantom.create();
        const page = await instance.createPage();

        console.log('Opening Stockholm events page');
        const status = await page.open('https://www.visitstockholm.com/events/');
        const content = await page.property('content');

        let jsonEvents = null;
        const city = 'Stockholm';
        const country = 'Sweden';
        page.evaluate(function () {

            setTimeout(function () {
                var a = document.getElementsByClassName('show-all-anchor')[0];
                var e = document.createEvent('MouseEvents');
                e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                a.dispatchEvent(e);
            }, 15000);
            return null;
        }).then(async function (el) {
            setTimeout(async function () {
                const content = await page.property('content');
                jsonEvents = parser.getRawEventsAndConvertToJson(city, country, content);
                fs.writeFileSync('parsed-data/stockholm-events.json', JSON.stringify(jsonEvents));
                if (content.toString().length > 1000) {
                    fs.writeFileSync('test/content.html', content.toString());
                }
                instance.exit();
                loadEventsToGetJsonEventsWithStreetData(jsonEvents);
            }, 30000)
        });
    })();
};

/**
 * Called parser.getStreetFromEvents to open up the page and get the street from the event.
 * @param events
 */
async function loadEventsToGetJsonEventsWithStreetData(events){

    const instance = await phantom.create();
    const page = await instance.createPage();

    let eventsToWrite = [];

    // page.on('onResourceRequested', function (requestData) {
    //     console.info('Requesting', requestData.url);
    // });

    page.on('onConsoleMessage', function (msg) { console.log(msg); });

    let failReadNumber = 0;

    for(let i=0; i < events.length; i++){

        let time = 5000;
        setTimeout(async function() {
            await page.open(events[i].moreInfoLink);
            setTimeout(async function () {
                const content = await page.property('content');
                const event = parser.getStreetForEvents(events[i], content);

                if(event.street !== null && event.streetNumber !== null) {
                    console.log('******************************************** Retrieved an event and writing to file: *****************************************************');
                    console.log(event);
                    eventsToWrite.push(event);
                }
                else{
                    //Write the data to a new file so it can be used as test data to improve the parser.
                    console.log('** STREET NOT RETRIEVED');
                    //use below just to get data, do not use it on production
                    // failReadNumber++;
                    // let fileToWrite = `test/html/failed_even_read_${failReadNumber}.html`;
                    // fs.appendFileSync(fileToWrite, content.toString());
                }
                fs.writeFileSync('parsed-data/stockholm-events.json', JSON.stringify(eventsToWrite));
                if(eventsToWrite.length === events.length){
                    instance.exit();
                }
            }, (time * i));
        }, time * i);
    }
}