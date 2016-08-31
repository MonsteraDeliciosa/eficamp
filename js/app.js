'use strict';
var config = {
    baseApi: "https://efigence-camp.herokuapp.com/api/"
};


var app = {
    init: function() {
        this.foundation();
        this.apiLogin();
        // this.sendAjax();
    },

    foundation: function() {
        $(document).foundation();
    },

    apiLogin: function() {
        $('#login').on('submit', function(e) {
            e.preventDefault();
            $.ajax({
                type: "post",
                data: {
                    login: "efi",
                    password: $('#password').val()
                },
                url: config.baseApi + "login",
                error: function(response) {
                    let jsonResponse = JSON.parse(response.responseText),
                        errorMessage = jsonResponse.message;
                    $('#password').addClass('error');
                    $('.error-label').fadeIn('slow');
                    $('.error-label').html(errorMessage);
                },
                success: function(response) {
                    window.location = "dashboard.html";
                    $('.error-label').fadeOut('slow');
                    console.log(response);
                    console.log(config.baseApi);
                }
            });
        });
    },

    // sendAjax: function(endpoint, method, data, sCallback, eCallback) {
    //     $.ajax({
    //             method: method,
    //             url: config.baseApi + endpoint,
    //             data: data,
    //         })
    //         .done(function(msg) {
    //             sCallback(msg);
    //         })
    //         .error(function(error) {
    //             eCallback(msg);
    //         })
    //     }

    //     error = function(msg) {
    //     console.log(msg);
    // }
    //
    //     success = function(msg) {
    //     console.log(msg);
    // }

    //     $('#login').on('submit', sendAjax("login", "POST", {
    //     login,
    //     password
    // }, success(msg), error(msg) ));

    //     $(document).ready(function {
    //     sendAjax("data/summary", "GET", {}, function(msg) {
    //         console.log(msg);
    //     }, error(msg));
    // });

};

$(document).ready(function() {
    // config.init();
    app.init();
});
