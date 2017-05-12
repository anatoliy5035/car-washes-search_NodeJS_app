let searchSubmits = {

    getMyGeolocation: function () {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
      },

    getMarkersFromInput: function () {
        let inputValue = $('.search-address').val();

        //send request for google geometry to get lat, lng from inputValue
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + inputValue + '&key=AIzaSyBdSWRnYpEd7XTwAKS7bptyyVlj5E0QBaQ', {
            method: 'post',
            body: inputValue,
        })
            .then(response => {
                if (response.status == 'INVALID_REQUEST') {
                    throw new Error('invalid request from google geolocation');
                }
                return response.json();
            })
            .then(parsedResponse => {
                let cordsObj = parsedResponse.results[0].geometry.location;
                Map.init(cordsObj);
            })
            .catch(err => {
                console.log(err);
            });
    },

    getMyLocationHtml: function () {
        this.getMyGeolocation()
            .then(position => {
                let positoinObj = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                return positoinObj;
            })
            .then(positionObj => {
                Map.init(positionObj);
            })
            .catch(err => {
                console.log(err);
            });
    },

    setAllCountry: function() {
        let allCountryCords = {
            lat: 49.391388,
            lng: 32.006755,
        };

        Map.init(allCountryCords, 7);
    },

    setPopularCity: function (element) {
        let allCountryCords = {
            lat: element.data('lat'),
            lng: element.data('lng'),
        };

        Map.init(allCountryCords);
    },

    events: function () {
        const _this = this;

        $('#submitInputButton').on('click', function (e) {
            e.preventDefault();
            _this.getMarkersFromInput();
        });


        $('#getMyLocation').on('click', function (e) {
            e.preventDefault();
            _this.getMyLocationHtml();
          });

        $('#setScaleToAllCountry').on('click', function (e) {
            e.preventDefault();
            _this.setAllCountry();
          });

        $('body').on('click', '#submitPopularCity', function (e) {
            e.preventDefault();
            _this.setPopularCity($(this));
          });
      },

    init: function () {
        this.events();
      },

  }

searchSubmits.init();