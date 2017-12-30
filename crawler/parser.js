const LineByLineReader = require('line-by-line');
const cheerio = require('cheerio');

const rootPath = 'https://www.visitstockholm.com/events';

module.exports.getRawEventsAndConvertToJson = (content) => {

    const $ = cheerio.load(content.toString());

    let events = [];

    const x = $('.eventList').html();
    const $$ = cheerio.load(x);
    // $$('li').each((i, elem) => events.push(elem) );

    $$('li').each((i, elem) => {
       const newEvent = {
           index: i,
           month: null,
           day: null,
           title: null,
           description: null,
           lat: null,
           lng: null,
           street: null,
           city: null,
           country: null,
           image: null,
           moreInfoLink: null
       };
        events.push(newEvent);
    });

    $$('.event-list__item').find('.event-time__date').each((i, elem) => {
       events.filter((e) => e.index === i)[0].day = elem.children[0].data;
    });

    $$('.event-list__item').find('.event-time__month').each((i, elem) =>{
       events.filter((e) => e.index === i)[0].month = elem.children[0].data;
    });

    $$('.event-list__item').find('.event-info__heading').each((i, elem) => {
        events.filter((e) => e.index ===i)[0].title = elem.children[0].data;
    });

    $$('.event-list__item').find('.event-info__content').each((i, elem) => {
        events.filter((e) => e.index === i)[0].description = elem.children[0].data;
    });

    $$('.event-list__item').find('.event-figure__img').each((i, elem) => {
        events.filter((e) => e.index === i)[0].image = rootPath + elem.attribs.src;
    });

    $$('.event-list__item').find('.event-list-anchor').each((i, elem) => {
        events.filter((e) => e.index === i)[0].moreInfoLink = rootPath + elem.attribs.href;
    });
    console.log("** Globati has retrieved events there are this many events: "+events.length);
    return events;
};

module.exports.getStreetForEvents = (events, content) => {
    for(var i=0; i< events.length; i++){

    }

    return event;

};