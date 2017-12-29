const parser = require('../crawler/parser');
var chai = require('chai');
const assert = chai.assert;
const fs = require('fs');


const dataurl = 'test/testdata.html';
const rawEvents = null;

beforeEach(() => {
    const content = fs.readFileSync(dataurl);
    this.rawEvents = parser.getRawEvents(content.toString())
});


it('Should return an array of raw event data', () => {
    assert.strictEqual(true, this.rawEvents.length>0);
});

it('Should return a dat in the form of 2 digits, and a month in the form of 3 characters', () => {
    // const dayregex = new RegExp([0-9][0-9]);
    // const monthregex = new RegExp([a-z][a-z][a-z]);
   for(var i=0; i<this.rawEvents.length; i++){
       console.log(this.rawEvents[i]);
   }
});


