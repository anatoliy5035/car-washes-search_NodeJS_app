const router = require('express').Router();
const input = require('./input');
const searchPage = require('./search-page');
var Markers = require('../models/markers');
var mongoose = require('mongoose');
const getMarkers = require('./getMarkersfromDB');

mongoose.connect('localhost:27017/scraped-data');
router.get('/', input);
router.get('/search', searchPage);
router.post('/getmarkers', getMarkers);
module.exports = router;
