const LineByLineReader = require('line-by-line');
const cheerio = require('cheerio');

const rootPath = 'https://www.visitstockholm.com/events/';

module.exports.getRawEvents = (content) => {

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
           image: null
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
    })




    // $$('.event-list__item').find('.event-time__date').each((i, elem) => {
    //
    // });

    // console.log(events);


    return events;
};

module.exports.getDateAsMilliseconds = (li) => {
    // console.log('************');
    // console.log(li.find('p'));

  return null;

};