const phantom = require('phantom');
const fs = require('fs');
const parser = require('./parser');

module.exports.startCrawler = () => {

    (async function () {
        const instance = await phantom.create();
        const page = await instance.createPage();
        await page.on('onResourceRequested', function (requestData) {
            console.info('Requesting', requestData.url);
        });
        const status = await page.open('https://www.visitstockholm.com/events/');
        const content = await page.property('content');

        let jsonEvents = null;
        const city = 'Stockholm';
        const country = 'Sweden';
        page.evaluate(function () {

            console.log("** Globati parser: Preparing to show all content. Program will finish in 30 seconds.");
            setTimeout(function () {
                var a = document.getElementsByClassName('show-all-anchor')[0];
                var e = document.createEvent('MouseEvents');
                e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                a.dispatchEvent(e);
            }, 5000);
            return null;
        }).then(async function (el) {
            setTimeout(async function () {
                const content = await page.property('content');
                console.log(content);a
                jsonEvents = parser.getRawEventsAndConvertToJson(city, country, content);
                fs.writeFileSync('parsed-data/stockholm-events.json', JSON.stringify(jsonEvents));
                if (content.toString().length > 1000) {
                    fs.writeFileSync('test/content.html', content.toString());
                }
                instance.exit();
                loadEventsToGetJsonEventsWithStreetData(jsonEvents);
            }, 10000)
        });
    })();
};

/**
 * Called parser.getStreetFromEvents to open up the page and get the street from the event.
 * @param events
 */
async function loadEventsToGetJsonEventsWithStreetData(events){
    let eventsToWrite = [];

    for(let i=0; i < events.length; i++){

        let time = 5000;
        setTimeout(async function() {

            const instance = await phantom.create();
            const page = await instance.createPage();
            await page.on('onResourceRequested', function(requestData) {
                console.info('Requesting', requestData.url);
            });

            await page.open(events[i].moreInfoLink);
            console.log('Opening moreInfo page for: '+events[i].moreInfoLink);
            setTimeout(async function () {
                const content = await page.property('content');
                fs.writeFileSync('test/event-details.html', content.toString());
                const event = parser.getStreetForEvents(events[i], content);
                instance.exit();
                eventsToWrite.push(event);
                if(eventsToWrite.length > 50) {
                    fs.writeFileSync('parsed-data/stockholm-events.json', JSON.stringify(eventsToWrite));
                }
            }, (time * i));
        }, time * i);
    }

}