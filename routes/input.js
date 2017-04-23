module.exports = (req, res, next) => {
    var Cities = require('../models/cities');
    let citiesArr;
    Cities.find(function (err, cities) {
        if (err) {
            throw new Error('error occured in the database');
        }
       res.locals.cities = cities;
    });

    res.render('input');
    next();
};
