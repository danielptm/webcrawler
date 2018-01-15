const cheerio = require('cheerio');
const fs = require('fs');


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
        // TODO: create a model folder and export this class, instead of defining the class here.
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

    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var websiteRegex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;

    //Used to match the space and number(s) for an address
    var spaceRegex = /\s\d{1,}/;

    const $$ = cheerio.load(content.toString());

    let data1 = '';
    let data2 = '';
    let data3 = '';

     $$('.event-detail__info').find('.event-detail__info--light').each((i, elem) =>{

         if(i === 0 && elem.children[0] != null){
             data1 = elem.children[0].data;
         }
         if(i == 1 && elem.children[0] != null ){
             data2 = elem.children[0];
         }
         if(i===2 && elem.children[0] != null){
             data3 = elem.children[0].data
         }

         if (emailRegex.test(data1) ){
             event.extra2 = data1;
         }
         if ( emailRegex.test(data2) ) {
             event.extra2 = data2;
         }

         if (emailRegex.test(data3) ){
             event.extra2 = data3;
         }

         if(websiteRegex.test(data1)){
             event.extra = data1
         }

         if(websiteRegex.test(data2)){
             event.extra = data2;
         }

         if(websiteRegex.test(data3)){
             event.extra = data3;
         }

         if(spaceRegex.test(data1)) {
             let items  = data1.split(' ');
             event.street = items[0];
             event.streetNumber = items[1];
         }

         if(spaceRegex.test(data2)) {
             let items  = data1.split(' ');
             event.street = items[0];
             event.streetNumber = items[1];
         }

         if(spaceRegex.test(data3)) {
             let items  = data1.split(' ');
             event.street = items[0];
             event.streetNumber = items[1];
         }

     });
    return event;
};

