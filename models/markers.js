var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

module.exports = mongoose.model('car_washes', markerSchema);
