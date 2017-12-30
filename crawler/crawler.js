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
    const $ = await cheerio.load(content);


    await page.on('onConsoleMessage', function(msg) {
        console.log(msg);
    });
    //
    //
    // await page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
    //     var foo = page.evaluate(function() {
    //         var el = document.getElementsByClassName('show-all-anchor');
    //         click(el[0]);
    //     });
    // });


   await page.evaluate(function(){
       return document.getElementsByClassName('show-all-anchor');
    }).then(function(html){
        console.log('*****************');
        console.log(html);

        // var ev = document.createEvent("MouseEvent");
        // ev.initMouseEvent(
        //     "click",
        //     true /* bubble */, true /* cancelable */,
        //     window, null,
        //     0, 0, 0, 0, /* coordinates */
        //     false, false, false, false, /* modifier keys */
        //     0 /*left*/, null
        // );
        //
        //
        //
        // el[0].dispatchEvent(ev);


        instance.exit();


    });



    //This works sometimes.
    // const html = await $('#eventList').html();
    // console.log(html);


})();

function click(el){
    console.log('HEJ!');
    var ev = document.createEvent("MouseEvent");
    ev.initMouseEvent(
        "click",
        true /* bubble */, true /* cancelable */,
        window, null,
        0, 0, 0, 0, /* coordinates */
        false, false, false, false, /* modifier keys */
        0 /*left*/, null
    );
    el.dispatchEvent(ev);
}
