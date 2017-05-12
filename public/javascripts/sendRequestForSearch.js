let getMyPosition = {

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

    events: function () {
        let self = this;

        $('#submitInputButton').on('click', function (e) {
            e.preventDefault();
            let inputValue = $('.search-address').val();

            //send request for google geometry to get lat, lng from inputValue
            fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + inputValue + '&key=AIzaSyBdSWRnYpEd7XTwAKS7bptyyVlj5E0QBaQ', {
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
                // let position  = self.convertObJToUrl(cordsObj);
                // let position =
                self.setLocationOnMap(cordsObj);
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

        $('#scaleAllCountry').on('click', function (e) {
            e.preventDefault();
            let allCountryObj = {
                lat: 49.391388,
                lng: 32.006755
            };
            self.setLocationOnMap(allCountryObj, 7);
        });

        $('body').on('click', '#popularCity', function(e) {
            e.preventDefault();

            let allCountryObj = {
                lat: $(this).data('lat'),
                lng: $(this).data('lng')
            };

            self.setLocationOnMap(allCountryObj);
        });
    },

    init : function () {
        this.events();
    },

};

getMyPosition.init();