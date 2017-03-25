function serialize(Obj) {
    var str = [];
    for(var p in Obj)
        if (Obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(Obj[p]));
        }
    return str.join("&");
}

$('.search-button').on('click', function (e) {
    e.preventDefault();
    var input = $('.search-address').val();
    fetch('/getCords', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: input
    }).then(function(response) {
        return response.json();
    }).then(function(parsedResponse) {
        window.location='/search?'+ serialize(parsedResponse);
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
    };

    getMyLocation()
        .then(position => {
            let posObj = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            return posObj;
        })
        .then(posObj => {
            window.location='/search?'+ serialize(posObj);
        });
});