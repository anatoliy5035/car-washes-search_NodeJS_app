module.exports = (req, res) => {
    var Cities = require('../models/cities');

    Cities.find(function (err, cities) {
        if (err) {
            throw new Error('error occured in the database');
        } else {
            res.render('input', {cities : cities});
        }
    });
};
