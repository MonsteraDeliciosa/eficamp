'use strict';
var config = {
    baseApi: "https://efigence-camp.herokuapp.com/api/"
};


var app = {
    init: function() {
        this.foundation();
        this.apiLogin();
        // this.sendAjax();
        this.dashboardData();
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
    // },

    dashboardData: function() {
        function sendAjax(endpoint, method, data, sCallback, eCallback) {
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

        var success = function(msg) {
            console.log(msg);
        }
        var error = function(msg) {
            console.log(msg);
        }

        sendAjax("data/history", "get", "content", success, error);
    }

    //   let error = function(msg) {
    //     console.log(msg);
    // }
    //
    //   let  success = function(msg) {
    //     console.log(msg);
    // }
    // $(document).ready(function () {
    // sendAjax("data/history", "get", "content", success, error);
    // });



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
