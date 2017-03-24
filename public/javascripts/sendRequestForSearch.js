$('.search-button').on('click', function (e) {
    e.preventDefault();
    var input = $('.search-address').val();
    fetch('/searchCords', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: input
    }).then(function(response) {
        return response.json();
    }).then(function(parsedResponse) {
        window.location = parsedResponse.redirectUrl;
    })
    .catch(function(error) {
        console.log('Request failed', error)
    });
});

$('#getMyLoc').on('click', function (e) {
    e.preventDefault();

    function getMyLocation() {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    getMyLocation()
        .then(position => {
        let posObj = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        return posObj;
    })
        .then(posObj => {
            let posObjectForRequest = JSON.stringify(posObj);
                fetch('/searchCords', {
                    method : 'post',
                    headers : {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body : posObjectForRequest
                })
                .then(response => {
                    return response.text();
                })
                .then(parsedResponse => {
                    // location.;
                })
        });
});