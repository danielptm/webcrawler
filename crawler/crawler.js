const phantom = require('phantom');
const fs = require('fs');

(async function() {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url);
  });
    const status = await page.open('https://www.visitstockholm.com/events/');
    const content = await page.property('content');
    page.evaluate(function(){
        var a = document.getElementsByClassName('show-all-anchor')[0];
        var e = document.createEvent('MouseEvents');
        e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
        return a;
    }).then(async function(el){
        setTimeout(async function(){
            const content = await page.property('content');
            fs.writeFileSync('test/unparsed-data/stockholm-events.json', content.toString());
            if(content.toString().length>1000){
                fs.writeFileSync('test/parsed-data/stockholm-events.json',content.toString());
            }
            instance.exit();
        }, 5000)
    });
})();
