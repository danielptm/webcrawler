const parser = require('../crawler/parser');
var chai = require('chai');
const assert = chai.assert;

it('Should return an array of event data', () => {
    const dataurl = 'test/testdata.txt';
    var events = parser.getEventsAsRawHTML(dataurl);


    assert.strictEqual(true, events.length>0);

});