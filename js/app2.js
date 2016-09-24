var config = {
    baseApi: "https://efigence-camp.herokuapp.com/api/"
};

sendAjax = function(endpoint, method, data, sCallback, eCallback) {
    $.ajax({
            method: method,
            url: config.baseApi + endpoint,
            data: data,
        })
        .done(function(msg) {
            sCallback(msg);
        })
        .error(function(error) {
            eCallback(msg);
        })
}

    var error = function(msg) {
    console.log(msg)
}


    sendAjax("data/summary", "GET", {}, function(msg) {
    console.log(msg);
}, error(msg));
};
