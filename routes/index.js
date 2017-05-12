const router = require('express').Router();
const input = require('./input');
const Markers = require('../models/markers');
const mongoose = require('mongoose');
const getMarkers = require('./getMarkersfromDB');

mongoose.connect('localhost:27017/scraped-data');

router.get('/', input);
router.post('/getmarkers', getMarkers);

module.exports = router;
