
let mongooseSchema = (function () {
    let mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/scraped-data');

    let markerSchema = new mongoose.Schema({
        name: String,
        city: String,
        address: String,
        phones: Array,
        website: String,
        type: String,
        dayAndNight: Boolean,
        rate: Number,
        cords: Array,
        description: String
    });

    markerSchema.index({loc: '2dsphere'});

    let carWash = mongoose.model('car_washes', markerSchema);

    return {
        mongoose: mongoose,
        carWash: carWash
    }

})();

module.exports = mongooseSchema;
