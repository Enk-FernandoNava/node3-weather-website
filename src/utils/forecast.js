const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {

    const queryLatLon = encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);
    const url = 'https://api.weatherstack.com/current?access_key=52baa98d375c1be16d5831ae85b7f928&query=' + queryLatLon

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Error at weather cast service!', undefined);
        }
        else if (body.error) {
            callback('Unable to find location!', undefined);
        }
        else {
            // const data = body;
            // const currentTemp = data.current;
            const { current: currentTemp } = body;

            const msg = currentTemp.weather_descriptions[0] + '. It is currently ' + currentTemp.temperature + ' degrees out. It feels Like ' + currentTemp.feelslike + ' degress out.';
            callback(undefined, msg);
        }

    });

}

module.exports = forecast;