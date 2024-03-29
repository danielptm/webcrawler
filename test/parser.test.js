const parser = require('../crawler/stockholm/parser');
const crawler = require('../crawler/stockholm/crawler');
var chai = require('chai');
const assert = chai.assert;
const fs = require('fs');
const rawEvents = null;
const streetData = null;
const dataurl = 'test/content.html';
const content = null;
const city = 'Stockholm';
const country = 'Sweden';


it('0 file', ()=>{

    const streeturl = 'test/website_example_data/stockholm/location_failed/failed_even_read_0.html';

    this.content = fs.readFileSync(streeturl).toString();
    this.rawEvents = parser.getRawEventsAndConvertToJson( this.city, this.country, this.content );

    for(var i =0; i < this.rawEvents.length; i++){
        const adjustedEvent = parser.getStreetForEvents(this.rawEvents[i], this.streetData.toString());
        // console.log(adjustedEvent);
        assert.strictEqual(true, adjustedEvent.street !== null);
    }

}).timeout(5000);

it('1 file', ()=>{

    const streeturl = 'test/website_example_data/stockholm/location_failed/failed_even_read_1.html';

    this.content = fs.readFileSync(streeturl).toString();
    this.rawEvents = parser.getRawEventsAndConvertToJson( this.city, this.country, this.content );

    for(var i =0; i < this.rawEvents.length; i++){
        const adjustedEvent = parser.getStreetForEvents(this.rawEvents[i], this.streetData.toString());
        // console.log(adjustedEvent);
        assert.strictEqual(true, adjustedEvent.street !== null);
    }

}).timeout(5000);