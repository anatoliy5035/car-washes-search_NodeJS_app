
let initMap = (function () {
    let map = new google.maps.Map(document.getElementById('js-map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 15,
        scrollwheel: false,
    });
    let infoWindow = new google.maps.InfoWindow({map: map});
    let pos;
    let markers;
    let templateInfoWindow;
    let icon = {
        url: 'images/ico.png',
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0)
    };
    let locationIco = {
        url: 'images/loc.png',
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0)
    }

    function getMarkersFromDB() {
        return fetch('/getmarkers', {
            method: 'post',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            }
        })
    }

    function getMyLocationFromUrl() {
        let pairs = location.search.slice(1).split('&');
        let resultCords = {};
        pairs.forEach(function (pair) {
            pair = pair.split('=');
            resultCords[pair[0]] = decodeURIComponent(pair[1] || '');
        });
        return resultCords;
    }

    function setLocationOnMap(position) {
         pos = {
            lat: parseFloat(position.lat),
            lng: parseFloat(position.lng)
        };
        let marker = new google.maps.Marker({
            position : new google.maps.LatLng(pos.lat, pos.lng),
            map : map
        });

        map.setCenter(pos);
    }

    function writeMarkers(markers) {
        return new Promise(function (resolve, reject) {
            let posLoc = pos;
            let center = new google.maps.LatLng(posLoc.lat, posLoc.lng);
            for (let i = 0; i < markers.length; i++) {
                let distance = google.maps.geometry.spherical.computeDistanceBetween(center, new google.maps.LatLng(markers[i].lat, markers[i].lng))
                if(distance < 10000) {
                    let marker = new google.maps.Marker({
                        position : new google.maps.LatLng(markers[i].lat, markers[i].lng),
                        map : map,
                        icon : icon
                    });

                    let infowindow = infoWindow;

                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            infowindow.setContent(
                                '<h4>Название: '+ markers[i].name +'</h4>'+
                                '<h4>Адрес: '+ markers[i].address +'</h4>'
                            );
                            infowindow.open(map, marker);
                        }
                    })(marker, i));
                }
            }
            resolve();
        })
    }

    function init() {
        getMarkersFromDB()
        .then(function (response) {
            return response.json();
        })
        .then(function (marks) {
            markers = marks;
            return getMyLocationFromUrl();
        })
        .then(function (pos) {
            setLocationOnMap(pos);
        })
        .then(function () {
            writeMarkers(markers);
        })
    }

    return {
        init: init
    }

})();

initMap.init();

