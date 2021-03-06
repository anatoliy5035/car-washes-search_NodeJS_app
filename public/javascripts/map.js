var Map = (function () {
    let myOptions = {
        center: {lat: 50.444247, lng: 30.508972},
        zoom: 13,
    };
    let map = new google.maps.Map(document.getElementById('js-map'), myOptions);
    let infoWindow = new google.maps.InfoWindow({map: map});
    let positionGlob;
    let markersGlob;
    let templateInfoWindow;
    let defaultZoom = myOptions.zoom;
    let icon = {
        url: 'images/ico.png',
        size: new google.maps.Size(59, 85),
        origin: new google.maps.Point(0, 0)
    };
    let locationIco = {
        url: 'images/loc.png',
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0)
    };

    function getMarkersFromDB() {
        return fetch('/getmarkers', {
            method: 'post',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            }
        });
    }


    function setLocationOnMap(position) {
        positionGlob = position;

        let marker = new google.maps.Marker({
            position : new google.maps.LatLng(position.lat, position.lng),
            map : map
        });

        map.setCenter(position);
    }

    function addInfoWindow(marker, i) {
        let infowindow = infoWindow;
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(
                    '<h4>Название: '+ markersGlob[i].name +'</h4>'+
                    '<h4>Адрес: '+ markersGlob[i].address +'</h4>'
                );
                infowindow.open(map, marker);
            }
        })(marker, i));
    }

    function writeRadiusMarkers(center, markers) {

        for (let i = 0; i < markers.length; i++) {
            let distance = google.maps.geometry.spherical.computeDistanceBetween(center, new google.maps.LatLng(markers[i].lat, markers[i].lng));
            if(distance < 10000) {
                let marker = new google.maps.Marker({
                    position : new google.maps.LatLng(markers[i].lat, markers[i].lng),
                    map : map,
                    icon : icon
                });

                addInfoWindow(marker, i);
            }
        }
    }

    function writeAllCountryMarkers(markers) {
        for (let i = 0; i < markers.length; i++) {
            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(markers[i].lat, markers[i].lng),
                map: map,
                icon: icon
            });
            addInfoWindow(marker, i);
        }
    }

    function cleanPreviousMarkers() {
        // clearMarkers();
        // map.removeOverlay(markersGlob);
    }

    function writeMarkers(markers, zoom) {
        cleanPreviousMarkers();
        let positionLoc = positionGlob;
        let center = new google.maps.LatLng(positionLoc.lat, positionLoc.lng);

        if(zoom !== undefined) {
            map.setZoom(zoom);
            writeAllCountryMarkers(markers);
        } else {
            map.setZoom(defaultZoom);
            writeRadiusMarkers(center, markers);
        }
    }

    function init(position, zoom) {
        setLocationOnMap(position);
        getMarkersFromDB()
        .then((response) => {
            if(response.status !== 200) {
                console.log('Cannot get markers from db')
            }
            return response.json();
        })
        .then((markersArray) => {
            markersGlob = markersArray;
        })
        .then(() => {
            writeMarkers(markersGlob, zoom);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return {
        init: init
    }

})();

