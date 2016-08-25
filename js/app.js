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
                url: "https://efigence-camp.herokuapp.com/api/login",
                error: function(response) {
                    // window.location = "http://nooooooooooooooo.com";
                    console.log(response.responseText);
                    // console.log('error!!!!');
                    console.log(response.data);
                    $('#password').addClass('error');
                    $('.error-label').slideToggle();
                    $('.error-label').html(response);
                },
                success: function(response) {
                    // $('#login').submit();
                    window.location = "dashboard.html";
                    console.log(response);
                    // console.log('success!!!!');
                    // $('#password').addClass('success');
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
    app.init();
});
