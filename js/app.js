'use strict';
var config = {
    baseApi: "https://efigence-camp.herokuapp.com/api/",
    login: "efi",
    // password: $('#password').val(),

};


var app = {
    init: function() {
        this.foundation();
        this.apiLogin();
        this.streamData();
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
                    login: config.login,
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

    streamData: function() {
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
        };

        var balanceField = $('.balance');
        var financeStreamField = $('.financeStream');
        var scheduledPaymentsField = $('.scheduledPayments');

        function formatMoney(cash) {

            var splitCash = cash.toString().split("");
            var lastDigits = splitCash[splitCash.length - 2] + splitCash[splitCash.length - 1];

            return cash.toString().slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, " ").concat("," + lastDigits);
        }

        var success = function(msg) {

            var response = $.parseJSON(JSON.stringify(msg));
            var content = response.content[0];
            var balance = content.balance;
            var funds = content.funds;
            var payments = content.payments;

            console.log(msg);
            console.log(response);

            balanceField.html(formatMoney(balance));
            financeStreamField.html(formatMoney(funds));
            scheduledPaymentsField.html(formatMoney(payments));
        }
        var error = function(msg) {
            var response = JSON.stringify(msg);
            console.log(msg);
            console.log(response);

            balanceField.html('no data');
            financeStreamField.html('no data');
            scheduledPaymentsField.html('no data');
        }

        $(document).ready(function() {
            sendAjax("data/summary", "get", "content", success, error);
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
        };


        var success = function(msg) {
            console.log(msg);
        }
        var error = function(msg) {
            console.log(msg);
        }

        $(document).ready(function() {
            sendAjax("data/history", "get", "content", success, error);
        });



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
