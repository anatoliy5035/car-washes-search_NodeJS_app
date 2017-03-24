$('.search-button').on('click', function (e) {
    e.preventDefault();
    var input = $('.search-address').val();
    fetch('/searchCords', {
        method: 'post',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
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