const parser = require('../crawler/parser');
var chai = require('chai');
const assert = chai.assert;
const fs = require('fs');


const streeturl = 'test/event-details.html';
const rawEvents = null;
const streetData = null;
const dataurl = 'test/content.html';
const content = null;

const city = 'Stockholm';
const country = 'Sweden';

beforeEach(() => {
    this.content = fs.readFileSync(dataurl).toString();
    this.streetData = fs.readFileSync(streeturl);
    this.content = fs.readFileSync(dataurl);
    this.rawEvents = parser.getRawEventsAndConvertToJson( this.city, this.country, this.content );


});



it('Should parse data, and return objects in a json array.', () => {

    this.rawEvents = parser.getRawEventsAndConvertToJson( this.city, this.country, this.content );

    // console.log(this.rawEvents);

    assert.strictEqual(true, this.rawEvents.length > 5);
});


it('Should get the street location for the event and store it in the object', ()=>{

    for(var i =0; i < this.rawEvents.length; i++){
        const adjustedEvent = parser.getStreetForEvents(this.rawEvents[i], this.streetData.toString());
        assert.strictEqual(true, adjustedEvent.street !== null);
    }

}).timeout(20000);


