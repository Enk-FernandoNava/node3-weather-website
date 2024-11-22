const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Fer'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Fernando'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help incoming! Please wait.',
        name: 'Fer'
    });
});


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        });
    }
    else {

        geocode(req.query.address, (error, { latitud, longitud, place } = {}) => {
            if (error) {
                // return console.log('Error: ' + error);
                return res.send({
                    error: error
                });
            }
            else if (latitud && longitud) {
                forecast(latitud, longitud, (error, forecastData) => {
                    if (error) {
                        return res.send({
                            error: error
                        });
                    }

                    res.send({
                        forecast: forecastData,
                        location: place,
                        address: req.query.address
                    });
                    
                });
            }
        });

    }




});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query);

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Not found',
        errorMessage: 'Help article not found',
        name: 'Fer'
    });

});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not found',
        errorMessage: 'Page not found',
        name: 'Fer'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});

