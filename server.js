6
'use strict';
// Constructor
function Location(city, locationData) {
    this.search_query = city;
    this.formated_query = locationData[0].display_name;
    this.latitude = locationData[0].lat;
    this.longitude = locationData[0].lon;
}
function Weather(foreCast,time) {
    this.foreCast = foreCast;
    this.time = time;
}
// Defining Application Dependencies
const express = require('express');
// const { request, response } = require('express');
const superagent = require('superagent');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const app = express();
app.use(cors());
// Routes
app.get('/', welcomePage);
app.get('/location', locationData);
app.get('/weather', weatherData);
app.use('*', notFound);
function handlErrors(response) {
    if (response.status === 500) {
        response.status(500).send('Sorry, something went wrong');
    }
}
// Helpers
function welcomePage(reqeust, response) {
    response.status(200).send('Home Page Welcome to express');
};
function locationData(request, response) {
    // const locationData = require('./data/location.json');
    const city = request.query.city;
    const url = `https://eu1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${city}&format=json`;
    superagent.get(url).then(locationData => {
        let location = new Location(city, locationData.body);
        response.json(location);
        handlErrors(response);
    }).catch(console.error);
}
function weatherData(request, response) {
    // const weatherData = require('./data/weather.json');
    const city = request.query.city;
    const longitude=request.query.longitude;
    const latitude=request.query.latitude;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&lat=${latitude}&lon=${longitude}&key=${WEATHER_API_KEY}`;
    let weatherArr = [];
    superagent.get(url).then(locationData => {
        let info=locationData.body.data.weather.description;
        let time=locationData.body.data.datetime;
    weatherArr = new Weather(info,time);
        response.json(weatherArr);
        handlErrors(response);
    }).catch(console.error);
}

function notFound(request, resp) {
    resp.status(404).send('Not found');
}
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
