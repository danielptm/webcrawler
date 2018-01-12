var express = require('express');
const entry = require('./crawler/crawler');
const schedule = require('node-schedule');
const fs = require('fs');

var app = express();

app.use(function (req, res, next) {

    const allowedOrigins = [
        'http://localhost:4200',
        'http://localhost:4201',
        'https://crawler.globati.com',
        'https://admin.globati.com',
        'https://crawler.globati.com/crawled-event',
        'https://crawler.globati.com'
    ];

    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin); // restrict it to the required domain
    }

    console.log(origin);

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', origin);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // The below is default, from a SO copy paste, I dont think it is necessary but I leave it as an exaple. ~~Daniel
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


const eventsUrl = 'parsed-data/stockholm-events.json';

var j = schedule.scheduleJob('15 1 * * *', function(){
    console.log('Starting web crawler...');
    entry.startCrawler();
});

app.listen(8081);

app.get('/crawled-event', (req, res) => {
    let events = fs.readFile(eventsUrl, (err, data) =>{
        if(err) throw err;
        const response = JSON.parse(data).splice(0,80);
        res.send(response);
    });
});
