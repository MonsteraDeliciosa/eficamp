'use strict';

var app = {
    init: function() {
        this.foundation();
        this.apiLogin();
    },

    foundation: function() {
        $(document).foundation();
    },

    apiLogin: function() {
        $('#password').on('blur', function() {
            console.log($(this).val());
        });

        $('.cta-btn').on('click', function() {
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
                    console.log('error!!!!');
                    $('#password').addClass('error');
                    $('.error-label').slideToggle();
                    $('.error-label').html(response);
                },
                success: function(response) {
                    window.location = "http://www.nyan.cat";
                    console.log(response);
                    console.log('success!!!!');
                    // $('#password').addClass('success');
                }
            });
        });
    }

};

$(document).ready(function() {
    app.init();
});
