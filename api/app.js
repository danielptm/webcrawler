var express = require('express');
const entry = require('./crawler');
const schedule = require('node-schedule');
const fs = require('fs');

var j = schedule.scheduleJob('15 4 * * *', function(){
    entry.startCrawler();
});

var app = express();

app.listen(3000);

module.exports.api = () => {
    return app;
}

module.exports.properties = () => {

    const environment = process.env.GLOBATI_SERVER_ENV;
    let properties = null;

    if(environment === 'development'){
        properties = JSON.parse(fs.readFileSync('properties/development.json').toString());
    }

    if(environment === process.env.GLOBATI_SERVER_ENV){
        properties = JSON.parse(fs.readFileSync('properties/production.json').toString());
    }

    return properties;

}