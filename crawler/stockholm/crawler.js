const puppeteer = require('puppeteer');
const parser = require('./parser');


//TODO: Redo the crawler with puppeteer https://www.npmjs.com/package/puppeteer
module.exports.startCrawler = () => {
    const puppeteer = require('puppeteer');
    const city = 'Stockholm';
    const country = 'Sweden';

    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.visitstockholm.com/events/', {waitUntil: 'networkidle0'});


        await page.click('a.show-all-anchor');

        await page.waitFor(5000);

        console.log('hi');
        let content = await page.content();

        console.log(content);

        // console.log(button);
        // await button.evaluate(button => button.click());
        //
        // page.waitFor({waitUntil: 'networkidle0'});
        //


        // let events = parser.getRawEventsAndConvertToJson(city, country, content);






        // console.log(events);

        await browser.close();
    })();
};

