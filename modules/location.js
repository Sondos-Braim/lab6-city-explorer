'use strict';
// Constructor
const helperGet = require('../modules/helpers');
function Location(city, locationData) {
    this.search_query = city;
    this.formated_query = locationData[0].display_name;
    this.latitude = locationData[0].lat;
    this.longitude = locationData[0].lon;
}
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;

function locationData(request, response) {
    const city = request.query.city;
    let location;
    const selectLocation = `SELECT * FROM location_info WHERE search_query=\'${city}\';`;
    helperGet.client.query(selectLocation).then(result => {
        console.log(result.rows);
        if (result.rows.length > 0) {
            // location = new Location(city, result.rows[0]);
            console.log(result.rows[0]);
            console.log(location);

            response.status(200).json(result.rows[0]);
        }
        else {
            const url = `https://eu1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${city}&format=json`;
            helperGet.superagent.get(url).then(locationData => {
                location = new Location(city, locationData.body);
                // response.json(location);
                const insert = 'INSERT INTO location_info (search_query,formated_query,latitude,longitude) VALUES ($1,$2,$3,$4);';
                const safeValues = [location.search_query, location.formated_query, location.latitude, location.longitude];
                helperGet.client.query(insert, safeValues).then(result => {
                    response.status(200).json(location);
                });
                // handlErrors(response);
            });
        }

    }).catch(() => {
        response.status(500).send('Something Went Wrong');
    });
}
module.exports = {
    Location, locationData
};
