var express = require('express');
const entry = require('../crawler/crawler');
const schedule = require('node-schedule');
const fs = require('fs');

var app = express();

app.use(function (req, res, next) {

    const allowedOrigins = ['http://localhost:4200','http://localhost:4201'];

    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin); // restrict it to the required domain
    }

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

var j = schedule.scheduleJob('15 4 * * *', function(){
    console.log('Starting web crawler...');
    entry.startCrawler();
});

app.listen(3000);

app.get('/crawled-event', (req, res) => {
    let events = fs.readFile(eventsUrl, (err, data) =>{
        if(err) throw err;
        const response = JSON.parse(data).splice(0,80);
        res.send(response);
    });
});