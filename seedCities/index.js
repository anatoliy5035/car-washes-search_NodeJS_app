const mongoose = require('mongoose');
const City = require('../models/cities');
mongoose.connect('mongodb://localhost:27017/scraped-data');

const cities = [
    new City({
        city: 'Киев',
        lat: 50.444247,
        lng: 30.508972
    }),
    new City({
        city: 'Харьков',
        lat: 49.987758,
        lng: 36.234227
    }),
    new City({
        city: 'Львов',
        lat: 49.842996,
        lng: 24.028437
    }),
    new City({
        city: 'Днепр',
        lat: 48.459759,
        lng: 35.038620
    })
];

let done = 0;
cities.forEach(function (city, i) {
    city.save(function (err, result) {
        done++
        if (done === cities.length) {
            exitDb();
        }
    });
});

function exitDb() {
    mongoose.disconnect();
}

module.exports = mongoose;