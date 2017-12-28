const parser = require('../crawler/parser');
var chai = require('chai');
const assert = chai.assert;

it('Should return an array of event data', () => {

    console.log('beginning');
    const dataurl = 'test/testdata.html';
    var events = parser.getEventsAsRawHTML(dataurl);

    console.log('end');

    assert.strictEqual(true, events.length>0);


});