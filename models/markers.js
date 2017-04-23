const mongoose = require('mongoose');
let Schema = mongoose.Schema;

var markerSchema = new Schema({
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

let markerModel = mongoose.model('car_washes', markerSchema);

module.exports = markerModel;

