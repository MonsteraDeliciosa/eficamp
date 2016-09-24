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
