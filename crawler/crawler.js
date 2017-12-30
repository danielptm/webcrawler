const phantom = require('phantom');
const fs = require('fs');
const parser = require('./parser');

(async function() {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url);
  });
    const status = await page.open('https://www.visitstockholm.com/events/');
    const content = await page.property('content');
    let jsonEvents  = null;
    page.evaluate(function(){

        console.log("** Globati parser: Preparing to show all content. Program will finish in 30 seconds.");
        setTimeout(function(){
            var a = document.getElementsByClassName('show-all-anchor')[0];
            var e = document.createEvent('MouseEvents');
            e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);

        },5000);
        return null;
    }).then(async function(el){
        setTimeout(async function(){
            const content = await page.property('content');
            console.log(content);
            jsonEvents = parser.getRawEventsAndConvertToJson(content);
            fs.writeFileSync('unparsed-data/stockholm-events.json', content.toString());
            if(content.toString().length>1000){
                fs.writeFileSync('parsed-data/stockholm-events.json',content.toString());
            }
            loadEventsToGetJson(jsonEvents);
            instance.exit();
        }, 20000)
    });

})();

function loadEventsToGetJson(events){
    console.log("**************************** HERES JSON");
    console.log(events);

}