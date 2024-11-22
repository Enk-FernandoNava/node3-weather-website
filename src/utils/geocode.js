const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZmVybmFuZG8tbmF2YSIsImEiOiJjbTNxMTVhM3owanBjMnFwbTVweTRsdDAyIn0.XajgxoRIn29zJft5xy9kGg&limit=1';
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Error with geobox service!', undefined);
        }
        else if (!body.features || body.features.length == 0) {
            callback('Unable to find location!', undefined);
        }
        else {
            const data = body;
            const lat = data.features[0].center[1];
            const lon = data.features[0].center[0];

            const mappedResponse = {
                place: data.features[0].place_name,
                latitud: lat,
                longitud: lon
            };

            callback(undefined, mappedResponse);
        }
    });
}

module.exports = geocode;