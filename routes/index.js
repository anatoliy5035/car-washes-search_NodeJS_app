const router = require('express').Router();
const input = require('./input');
const searchPage = require('./search-page');
var CarWash = require('../models/markers');
var mongoose = require('mongoose');
// const getMarkers = require('./getMarkersfromDB');
// const getCities = require('./getCitiesfromDB');

router.get('/', input);
router.get('/search', searchPage);
router.post('/getmarkers', function (req, res, next) {
    // CarWash.find({}, function (err, docs) {
    //
    // });
});
// routes.use(getCities);

module.exports = router;
