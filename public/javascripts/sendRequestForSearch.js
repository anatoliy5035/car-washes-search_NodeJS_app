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

    setLocationOnMap : function (position, zoomValue) {
        if(zoomValue !== undefined) {
            window.location='/search?' + position + '&zoom=' + zoomValue + '&scale=true';
        } else {
            window.location='/search?' + position;
        }
    },

    events : function () {
        let self = this;

        $('#submitInputButton').on('click', function (e) {
            e.preventDefault();
            var inputValue = $('.search-address').val();
            fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+inputValue+'&key=AIzaSyBdSWRnYpEd7XTwAKS7bptyyVlj5E0QBaQ', {
                method: 'post',
                body: inputValue
            })
            .then(response => {
                if(response.status == 'INVALID_REQUEST') {
                    throw new Error('invalid request from google geolocation');
                }
                return response.json();
            })
            .then(parsedResponse => {
                let cordsObj = parsedResponse.results[0].geometry.location;
                let position  = self.convertObJToUrl(cordsObj);
                self.setLocationOnMap(position);
            })
            .catch(err => {
                console.log(err);
            });
        });

        $('#getMyLoc').on('click', function (e) {
            e.preventDefault();
            self.getMyGeolocation()
                .then(position => {
                    let positoinObj = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    return positoinObj;
                })
                .then(posObj => {
                    let cordsObj = self.convertObJToUrl(posObj);
                    self.setLocationOnMap(cordsObj);
                })
                .catch(err => {
                    console.log(err);
                });
        });

        $('#getAllCountry').on('click', function (e) {
            e.preventDefault();
            let allCountryObj = {
                lat: 49.391388,
                lng: 32.006755
            };
            let cordsObj = self.convertObJToUrl(allCountryObj);
            self.setLocationOnMap(cordsObj, 7);
        });
    },

    init : function () {
        this.events();
    },

};

getMyPosition.init();