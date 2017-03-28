let markersResult = [];
let model = require('./index');
let CarWash = model.carWash;

module.exports = function (app) {
    app.post('/getmarkers', function (req, res) {
        function findInDB() {
            let markersQuery = CarWash.find({}, function (err, washes) {
                if (err) {
                    throw new Error('error occured in the database');
                }
            });

            markersQuery.then(washes => {
                if(!washes) {
                    throw new Error('washes not found in DB');
                }
                return washes;
            })
            .then(washesResult => {
                filterCords(washesResult);
            })
            .catch(err => {
                console.log(err);
            });
        }

        function filterCords(washes) {
            washes.forEach(function (wash, i) {
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

        findInDB();
    });
}










