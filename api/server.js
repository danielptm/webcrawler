var express = require('express');
const entry = require('../crawler/crawler');
const schedule = require('node-schedule');
const fs = require('fs');

var app = express();
const eventsUrl = 'parsed-data/stockholm-events.json';

var j = schedule.scheduleJob('12 14 * * *', function(){
    console.log('Starting web crawler...');
    entry.startCrawler();
});

app.listen(3000);

app.get('/crawled-event', (req, res) => {
    console.log('hi');
    let events = fs.readFile(eventsUrl, (err, data) =>{
        if(err) throw err;
        res.send(JSON.parse(data));
    });
});