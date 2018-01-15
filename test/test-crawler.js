
const crawler = require('../crawler/stockholm/crawler');
const hotelCrawler = require('../crawler/hostel_world/crawler');


// it('Should start the crawler', ()=>{
//     crawler.startCrawler();
// });

it('Should start the hostel/hotel crawler.', ()=>{
    hotelCrawler.startCrawler();
});