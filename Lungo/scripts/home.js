Lungo.dom("#home-screen-add").on("tap", function () {
    if (Lungo.Data.Storage.persistent("localExpenses")) {
        Lungo.Notification.confirm({
            icon: "warning",
            title: "Saved expense form",
            description: "You already have a form filled in, would you like to continue that form?",
            accept: {
                label: "Yes",
                callback: function () {
                    Lungo.Router.section("create2");
                }
            },
            cancel: {
                label: "No",
                callback: function () {
                    // clear local expenses
                    Lungo.Data.Storage.persistent("localExpenses", null);
                    Lungo.Router.section("create1");
                }
            }
        });
    } else {
        Lungo.Router.section("create1");
    }
});

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
            // delete everything
            Lungo.Data.Storage.persistent("token", null);
            Lungo.Data.Storage.persistent("user", null);
            Lungo.Data.Storage.persistent("serverForms", null);
            Lungo.Data.Storage.persistent("localExpenses", null);
            Lungo.Data.Storage.persistent("projectCodes", null);
            Lungo.Data.Storage.persistent("currencies", null);
            Lungo.Data.Storage.session("tempEvidence", null);
            // go to login screen
            Lungo.Router.section("login");
        },
        // type
        "text"
    );
});

function loadUserInformation() {
    var user = Lungo.Data.Storage.persistent("user");
    $$("#home-screen-name").text(user.firstName + " " + user.lastName);
}