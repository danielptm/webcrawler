const entry = require('./crawler');
const schedule = require('node-schedule');

var j = schedule.scheduleJob('18 4 * * *', function(){
    entry.startCrawler();
});


