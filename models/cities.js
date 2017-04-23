var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    city: {type: String, required: true},
    lat: {type: Number, required: true},
    lng: {type: Number, required: true}
});

module.exports = mongoose.model('Cities', schema);