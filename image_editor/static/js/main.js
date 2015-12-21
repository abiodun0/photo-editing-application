$.ajaxSetup({
    headers: {
        "X-CSRFToken": $("meta[name='csrf-token']").attr("content")
    }
});


function socialLogin(user) {
    var ajaxinfo = {
        url: "/login",
        type: "POST",
        data: user,
        success: function(data) {
            console.log(data);
            if (data == "success") {
                location.href = "/dashboard";
            }
            if (data == "register") {
                $("#tab_link").trigger("click");
                if (user.first_name !== undefined) {
                    $("#signup-form").append("<input type='hidden' name='first_name' value='" + user.first_name + "'>");
                    $("#signup-form").append("<input type='hidden' name='last_name' value='" + user.last_name + "'>");
                } else {
                    $("#signup-form").append("<input type='hidden' name='first_name' value='" + user.given_name + "'>");
                    $("#signup-form").append("<input type='hidden' name='last_name' value='" + user.family_name + "'>");
                }

                $("#signup-form").append("<input type='hidden' name='social_id' value='" + user.id + "'>");
                $("#id_email").val(user.email);
            }
        },
        error: function(error) {
            console.log(error.responseText)
        }
    };
    console.log(user);
    $.ajax(ajaxinfo);
}



var facebookLogin = {
    config: {
        fb_id: "1472709103038197"
    },
    init: function(config) {
        $(facebookLogin.config.login).attr("disabled", true);
        if (config && typeof(config) == "object") {
            $.extend(facebookLogin.config, config);
        }
        $.getScript("//connect.facebook.net/en_US/sdk.js", function() {
            FB.init({
                appId: facebookLogin.config.fb_id,
                version: "v2.5"
            });
            $(facebookLogin.config.login).attr("disabled", false);
        });
        $(facebookLogin.config.login).click(function(e) {
            e.preventDefault();
            facebookLogin.login();
        });
    },
    login: function() {
        FB.login(function(response) {
            if (response.authResponse) {
                console.log("Welcome!  Fetching your information.... ");
                FB.api("/me?fields=email,first_name,last_name,picture", socialLogin);
            } else {
                console.log("Not logged in");
            }
        }, {
            scope: "email,user_likes"
        });
    },
};

$(document).ready(function() {

    facebookLogin.init({
        fb_id: "530011690497751",
        login: "#facebook-login",
    });
});

