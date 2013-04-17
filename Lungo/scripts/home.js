Lungo.dom("#home-logout").on("tap", function () {
    // show loading screen
    Lungo.Notification.show();
    // make the AJAX-request
    Lungo.Service.post(
        // url
        EA.baseURL + "resources/userService/logout",
        // data
        {
            "token": Lungo.Data.Storage.persistent("token")
        },
        // callback
        function () {
            // hide loading screen
            Lungo.Notification.hide();
            // delete token
            Lungo.Data.Storage.persistent("token", null);
            // go to login screen
            Lungo.Router.section("login");
        },
        // type
        "text"
    );
});

Lungo.dom("#home").on("load", function () {
    console.log(Lungo.Data.Storage.persistent("token"));
});