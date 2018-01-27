var express = require('express');
const entry = require('./crawler/stockholm/crawler');
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

    console.log('Origin: '+origin);

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


var j = schedule.scheduleJob('35 13 * * *', function(){
    console.log('Starting web crawler...');
    entry.startCrawler();
});

app.listen(8081);

app.get('/crawled-event/:city', (req, res) => {
    let city = req.params.city.toLowerCase();
    if(city === 'stockholm') {
        let events = fs.readFile(eventsUrl, (err, data) => {
            if (err) throw err;
            const response = JSON.parse(data).splice(0, 80);
            res.send(response);
        });
    }
    else {
        res.send([]);
    }
});

app.get('/defaultmessage/:city', (req, res) => {
    let city = req.params.city.toUpperCase();
    let message = `Sorry! The automatic events listing service is not running in ${city} yet, but you can check the site below for events and add them manually to your globati page.`;
    console.log('No events: ');
    console.log(city);
    let noevents = {
        "message":null,
        "link":null
    };
    res.send(noevents);
    if( city === 'Amsterdam' ){
        let noevents = {
            "message": message,
            "link":"https://www.iamsterdam.com/en/see-and-do/whats-on/monthly-event-calendar"
        };
        res.send(noevents)
    }
    else if(city ==='Oslo'){
        let noevents = {
            "message":message,
            "link":'https://www.visitoslo.com/en/whats-on/events/'
        };

    }
    else if(city ==='Copenhagen'){
        let noevents = {
            "message":message,
            "link":'https://www.visitcopenhagen.com/search/whatson'
        };

    }
    else if(city ==='Malmo' || 'Malmö'){
        let noevents = {
            "message":message,
            "link":'http://www.malmotown.com/en/events-calendar/'
        };

    }
    else if(city ==='Gothenburg'){
        let noevents = {
            "message":message,
            "link":'http://www.goteborg.com/en/events/'
        };

    }
    else if(city ==='London'){
        let noevents = {
            "message":message,
            "link":'https://www.visitlondon.com/things-to-do/whats-on/special-events/london-events-calendar'
        };

    }
})