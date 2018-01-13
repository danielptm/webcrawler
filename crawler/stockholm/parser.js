const LineByLineReader = require('line-by-line');
const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');


const rootPath = 'https://www.visitstockholm.com';
const APIKEY = 'AIzaSyAUqNpRm7FyWf5O8EXVkjVy9PjXmfGkHsg';


/**
 * Parses html and returns a json array with the events.
 * @param city
 * @param country
 * @param content
 * @returns {Array}
 */
module.exports.getRawEventsAndConvertToJson = (city, country, content) => {

    const $ = cheerio.load(content);
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
           streetNumber: null,
           city: city,
           country: country,
           image: null,
           moreInfoLink: null,
           location: null,
           extra: null,
           extra2: null
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
    return events;
};

module.exports.getStreetForEvents = (event, content) => {

    const $$ = cheerio.load(content.toString());

    // const street = null;
    // const streetNumber = null;
    // const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${street+"+"+streetNumber+"+"+city+"+"+country}&key=+${APIKEY}`;

     const x = $$('.event-detail__info').find('.event-detail__info--light').each((i, elem) =>{
         if(i === 0){
             event.extra = elem.children[0].data;
         }
         if(i == 1){
             const streetItems = elem.children[0].data.split(' ');
             event.street = streetItems[0];
             event.streetNumber = streetItems[1];
         }
         if(i===2){
             event.extra2 = elem.children[0].data
         }
     });
    return event;
};

