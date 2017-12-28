const LineByLineReader = require('line-by-line');
const cheerio = require('cheerio');
const fs = require('fs');


module.exports.getEventsAsRawHTML = (texturl) => {
    var eventItem = new RegExp("<li class=\"event-list__item event-list__item--image\">(.*)</li>");


    const lr = new LineByLineReader(texturl);
    // const $ = cheerio.load(content);
    // const listText = $('#eventList').children().text();

    let events = [];
    const text = fs.readFileSync(texturl);

    // console.log(text.toString());

    const items = text.toString().match(eventItem);

    console.log('*****');
    console.log(items);


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