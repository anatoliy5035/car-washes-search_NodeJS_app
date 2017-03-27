let getMyPosition = {
    convertObJToUrl: function (Obj) {
        var str = [];
        for(var p in Obj)
            if (Obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(Obj[p]));
            }
        return str.join("&");
    },

    getMyGeolocation : function () {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    },

    events : function () {
        let self = this;

        $('.search-button').on('click', function (e) {
            e.preventDefault();
            var input = $('.search-address').val();
            fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+input+'&key=AIzaSyBdSWRnYpEd7XTwAKS7bptyyVlj5E0QBaQ', {
                method: 'post',
                body: input
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(parsedResponse) {
                let cordsObj = parsedResponse.results[0].geometry.location;
                window.location='/search?'+ self.convertObJToUrl(cordsObj);
            })
            .catch(function(error) {
                console.log('Request failed', error)
            });
        });

        $('#getMyLoc').on('click', function (e) {
            e.preventDefault();
            self.getMyGeolocation()
            .then(position => {
                let posObj = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                return posObj;
            })
            .then(posObj => {
                let cordsObj = self.convertObJToUrl(posObj);
                window.location='/search?'+ cordsObj;
            });
        });
    },

    init : function () {
        this.events();
    },

}

getMyPosition.init();