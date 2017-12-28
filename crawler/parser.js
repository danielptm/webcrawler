const LineByLineReader = require('line-by-line');
const cheerio = require('cheerio');
const fs = require('fs');


module.exports.getEventsAsRawHTML = (texturl) => {
    // var eventItem = new RegExp("<li class=\"event-list__item event-list__item--image\">(.*)</li>");
    // var eventItem = new RegExp("<li class=\"event-list__item event-list__item--image\">(.|/\\n/*)</li>");

    const content = fs.readFileSync(texturl);

    // const lr = new LineByLineReader(texturl);
    const $ = cheerio.load(content);
    const listText = $('li').toArray();



    listText.forEach((item) => console.log(item.children.forEach((e) => console.log(e))) );

    // console.log(listText);

    let events = [];

    // console.log(text.toString());

    // const items = text.toString().match(eventItem);

    // console.log('*******');
    //
    // console.log(items);


    // for(var i=0; i<items.length; i++){
    //     console.log('*************************************************************************************************************************************************************************************************************************************************');
    //     console.log(items[i]);
    // }


    // lr.on('line', function (line) {
    //     console.log(line);
    //     if(line.match(eventItem)){
    //         // console.log("888");
    //         // console.log(line.trim());
    //
    //     }
    // });




    return events;
}