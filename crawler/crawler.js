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
    const listText = $('#eventList').children().text();


    console.log(content);

    // const json = JSON.parse(text);

    // // promise
    // writeFile.promise('events/events.txt', text, null)
    //     .then(function() {
    //         console.log('********************************************************');
    //         console.log('Done writing');
    //     });


  await instance.exit();
})();
