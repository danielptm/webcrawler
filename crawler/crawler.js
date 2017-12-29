const phantom = require('phantom');
const cheerio = require('cheerio');
const writeFile = require('write');

(async function() {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url);
  });

    const status = await page.open('https://www.visitstockholm.com/events/');
    const content = await page.property('content');

    // console.log(content);
    const $ = cheerio.load(content);


    await instance.exit();
})();
