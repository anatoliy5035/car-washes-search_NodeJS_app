module.exports = (req, res, next) => {
    let markersResult = [];
    let Marker = require('../models/markers');

    Marker.find(function (err, docs) {
        if (err) {
            throw new Error('error occured in the database');
        }
        if (!docs) {
            throw new Error('washes not found in DB');
        }
        filterCords(docs);
    });

    function filterCords(washes) {
        washes.forEach(function (wash) {
            let markerCords = (wash.cords.toString().match(/\d+.\d+/g));
            let lng = markerCords[0];
            let lat = markerCords[1];
            markersResult.push({
                name: wash.name,
                city: wash.city,
                address: wash.address,
                lng: lng,
                lat: lat
            });
        });

        if(!markersResult.length) {
            res.sendStatus(404);
        }
        res.send(markersResult);
    }
};












