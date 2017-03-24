let markersResult = [];
let model = require('./index');
let CarWash = model.carWash;

module.exports = function (app) {
    app.post('/getmarkers', function (req, res) {
        function findInDB() {
            let markersQuery = CarWash.find({}, function (err, washes) {});
            markersQuery.then(function (washes) {
                return washes;
            }).then(function (res) {
                filterCords(res)
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
            res.send(markersResult);
        }

        findInDB();
    });
}










