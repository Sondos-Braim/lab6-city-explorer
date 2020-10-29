'use strict';
const helperGet = require('../modules/helpers');

function Weather(data) {
    this.forecast = data.weather.description;
    this.time = data.datetime;
  }
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

  function weatherData(request, response) {
    const city = request.query.search_query;
    const longitude = request.query.longitude;
    const latitude = request.query.latitude;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&lat=${latitude}&lon=${longitude}&key=${WEATHER_API_KEY}`;
    let weatherArr = [];
    helperGet.superagent.get(url).then(locationData => {
      locationData.body.data.map(data => {
        weatherArr.push(new Weather(data));
      });

      response.json(weatherArr);
      // handlErrors(response);
    });
    // .catch(console.error);
  }

  module.exports={
      Weather,weatherData
};
