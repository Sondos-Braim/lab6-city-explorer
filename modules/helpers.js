// Defining Application Dependencies
const helper={};
helper.express = require('express');
helper.superagent = require('superagent');
helper.cors = require('cors');
helper.pg = require('pg');
// helper.{ request, response } = require('express');
helper.PORT = process.env.PORT || 3000;
helper.DATABASE_URL = process.env.DATABASE_URL;
helper.GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
helper.WEATHER_API_KEY = process.env.WEATHER_API_KEY;
helper.TRAIL_API_KEY = process.env.TRAIL_API_KEY;
helper.MOVIE_API_KEY=process.env.MOVIE_API_KEY;
helper.YELP_API_KEY=process.env.YELP_API_KEY;
// helper.app = express();
// helper.client = new pg.Client(DATABASE_URL);

module.exports=helper;
