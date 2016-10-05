'use strict';
var config = {
    baseApi: "https://efigence-camp.herokuapp.com/api/",
    login: "efi"
};


var app = {
    init: function() {
        this.foundation();
        this.apiLogin();
        this.streamData();
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
                });
        }

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
        };
        var error = function(msg) {
            var response = JSON.stringify(msg);
            console.log(msg);
            console.log(response);

            balanceField.html('no data');
            financeStreamField.html('no data');
            scheduledPaymentsField.html('no data');
        };

        $(document).ready(function() {
            sendAjax("data/summary", "get", "content", success, error);
        });
    },

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
                });
        }

        var list = $('.clone-list');
        var clone = $('.js-clone');

        var dateField = $('.date');
        var descriptionField = $('.description');
        var categoryField = $('.category');
        var statusField = $('.status');
        var amountField = $('.amount');
        var currencyField = $('.hcurrency');

        var success = function(msg) {
            console.log(msg);

            function formatMoney(cash) {

                var splitCash = cash.toString().split("");
                var lastDigits = splitCash[splitCash.length - 2] + splitCash[splitCash.length - 1];

                return cash.toString().slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, " ").concat("," + lastDigits);
            }

            var response = $.parseJSON(JSON.stringify(msg));

            // for (var i = 0; i < response.content.length; i++) {
            //
            //     var _this = $('#' + i);
            //
            //     var content = response.content[i];
            //     var date = content.date;
            //     var description = content.description;
            //     var category = content.category;
            //     var status = content.status;
            //     var amount = content.amount;
            //     var currency = content.currency;
            //
            //     list
            //         .clone()
            //         .appendTo('.data-list')
            //         .addClass('js-clone')
            //         .css('display', 'block')
            //         .attr('id', i);
            //
            //     dateField.html(date);
            //     descriptionField.html(description);
            //     categoryField.html(category);
            //     statusField.html(status);
            //     amountField.html(formatMoney(amount));
            //     currencyField.html(currency);
            // }

            for (var j = response.content.length - 1; j > 0; j--) {

              // console.log(response.content);
              console.log(j);

                var _this = $('#' + j);

                var content = response.content[j];
                var date = content.date;
                var description = content.description;
                var category = content.category;
                var status = content.status;
                var amount = content.amount;
                var currency = content.currency;

                list
                    .clone()
                    .appendTo('.data-list')
                    .addClass('js-clone')
                    .css('display', 'block')
                    .attr('id', j);



                dateField.html(date);
                descriptionField.html(description);
                categoryField.html(category);
                statusField.html(status);
                amountField.html(formatMoney(amount));
                currencyField.html(currency);
            }



            // console.log(content);

            // dateField.html(date);
            // descriptionField.html(description);
            // categoryField.html(category);
            // statusField.html(status);
            // amountField.html(formatMoney(amount));
            // currencyField.html(currency);

        };
        var error = function(msg) {
            var response = JSON.stringify(msg);
            console.log(msg);
            console.log(response);

            $('.js-getData').html('no data');
        };

        $(document).ready(function() {
            sendAjax("data/history", "get", "content", success, error);
        });
    }


};

$(document).ready(function() {
    // config.init();
    app.init();
});
