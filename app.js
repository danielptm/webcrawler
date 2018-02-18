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

    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();

});


const eventsUrl = 'parsed-data/stockholm-events.json';


var j = schedule.scheduleJob('16 21 * * *', function(){
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
});

app.get('/crawled-event/noeventsmessage/:city', (req, res) => {
    let city = req.params.city.toLowerCase();
    let message = `Sorry! The automatic events listing service is not running in ${city} yet, but you can check the site below for events and add them manually to your globati page.`;
    let noevents = null;

    if( city=== 'stockholm'){
        noevents = {
            "message": message,
            "link": "https://www.visitstockholm.com/events/"
        }
    }

    if( city === 'amsterdam' ){
        noevents = {
            "message": message,
            "link":"https://www.iamsterdam.com/en/see-and-do/whats-on/monthly-event-calendar"
        };
    }
    else if(city === 'oslo'){
        noevents = {
            "message":message,
            "link":'https://www.visitoslo.com/en/whats-on/events/'
        };

    }
    else if(city === 'copenhagen' || city ==='københavn'){
        noevents = {
            "message":message,
            "link":'https://www.visitcopenhagen.com/search/whatson'
        };

    }
    else if(city === 'malmo' || city === 'malmö'){
        noevents = {
            "message":message,
            "link":'http://www.malmotown.com/en/events-calendar/'
        };

    }
    else if(city === 'gothenburg' || city === 'göteborg'){
        noevents = {
            "message":message,
            "link":'http://www.goteborg.com/en/events/'
        };

    }
    else if(city === 'london'){
        noevents = {
            "message":message,
            "link":'https://www.visitlondon.com/things-to-do/whats-on/special-events/london-events-calendar'
        };

    }
    else{
        noevents = {
            "message": `Sorry! The automatic events listing service is not running in ${city} yet. If you want it running here then let us know at.`,
            "link": "https://globati.com"
        }
    }

    res.send(noevents)

})