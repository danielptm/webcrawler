const parser = require('../crawler/parser');
var chai = require('chai');
const assert = chai.assert;
const fs = require('fs');


const dataurl = 'test/testdata.html';
const streeturl = 'test/streetdata.html';
const rawEvents = null;
const streetData = null;
const content = null;

beforeEach(() => {
    this.content = fs.readFileSync(dataurl);
    this.streetData = fs.readFileSync(streeturl);

});



it('Should parse data, and return objects in a json array.', () => {
    this.rawEvents = parser.getRawEventsAndConvertToJson(this.content.toString());
    assert.strictEqual(true, this.rawEvents.length > 0);
});


it('Should get the street location for the event and store it in the object', ()=>{

    for(var i =0; i< this.rawEvents.length; i++){
        const adjustedEvent = parser.getStreetForEvents(this.rawEvents[i], this.streetData.toString());
        assert.strictEqual(true, adjustedEvent.street !== null);
    }

});


