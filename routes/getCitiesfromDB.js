const Cities = require('./../models/cities');

Cities.find(function (err, cities) {
    //     if (err) {
    //         throw new Error('error occured in the database');
    //     }
    //     res.locals = cities;
});

module.exports = function (app) {

    // app.use(function (req, res, next) {
    //     Cities.find(function (err, cities) {
    //     //     if (err) {
    //     //         throw new Error('error occured in the database');
    //     //     }
    //     //     res.locals = cities;
    //     });
    // });
}