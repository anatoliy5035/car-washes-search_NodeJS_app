let getMyLocation = {

    getMyGeolocation: function () {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    },

    setLocationOnMap: function (position, zoomValue) {
        if (zoomValue !== undefined) {
            Map.init(position, zoomValue);
        } else {
            Map.init(position);
        }
    },

    init: function () {
        this.getMyGeolocation();
    },

}
