const puppeteer = require('puppeteer');
const parser = require('./parser');
const fs = require('fs');


module.exports.startCrawler = () => {
    const puppeteer = require('puppeteer');
    const city = 'Stockholm';
    const country = 'Sweden';

    (async () => {
        let eventsToWrite = [];

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.visitstockholm.com/events/', {waitUntil: 'networkidle0'});

        await page.click('a.show-all-anchor');

        await page.waitFor(5000);

        let content = await page.content();

        let events = parser.getRawEventsAndConvertToJson(city, country, content);

        for(let i = 0; i < events.length; i++){
            await page.goto(events[i].moreInfoLink, {waitUntil: 'networkidle0'});
            await page.waitFor(5000);
            let content = await page.content();
            const event = parser.getStreetForEvents(events[i], content);
            if(event.street != null && event.streetNumber != null){
                console.log('** Web crawler found an event');
                console.log(event);
                eventsToWrite.push(event);
                fs.writeFileSync('parsed-data/stockholm-events.json', JSON.stringify(eventsToWrite));

            }
            else{
                // TODO: Create handler to write to test data. Make this be based off an environment variable, so its not called in production.
                console.log('** Event found but location details could not be obtained');
            }
        }
        await browser.close();
    })();
};
