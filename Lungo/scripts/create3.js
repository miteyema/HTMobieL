Lungo.dom("#create3").on("load", function () {
    // show currencies
    var $$currencyList = $$("#create3-add-currency");
    var currencies = Lungo.Data.Storage.persistent("currencies");
    $$currencyList.empty();
    $$.each(currencies, function (i, currency) {
        $$currencyList.append("<option value=\"" + currency.name + "\">" + currency.name + "</option>");
    });

    // reset view
    $$("#create3-add-form")[0].reset();
    $$("#create3-tab-domestic").addClass("active");
    $$("#create3-tab-abroad").removeClass("active");
    $$("#create3-add-currency").parent().parent().hide();
    $$("#create3-add-converted").parent().hide();
    $$("#create3-add-type").find("option[value='2']").remove();
    $$("#create3-add-type").find("option[value='3']").remove();
    $$("#create3-add-type").find("option[value='4']").remove();

    // evidence to base64 via FileReaderAPI and HTML5 canvas
    $$('#create3-add-evidence')[0].onchange = function (e) {
        // get the file
        var file = e.target.files[0];

        if (window.FileReader) {
            // initialize reader
            var reader = new FileReader();
            // if the image was read, load it into the canvas
            reader.onload = function (e) {
                // get the canvas that is hidden on that page
                var canvas = $$('#create3-add-canvas')[0];
                var context = canvas.getContext('2d');
                var img = new Image();
                // if the image is in canvas, get base64
                img.onload = function () {
                    // set canvas dimensions to image dimensions
                    canvas.width = this.width;
                    canvas.height = this.height;
                    // draw the image on the canvas
                    context.drawImage(this, 0, 0);
                    // get the base64 string
                    var base64 = EA.base64WithoutPrefix(canvas.toDataURL());
                    // TODO check if this can fail in Lungo
                    Lungo.Data.Storage.session("tempEvidence", base64);
                    // hide loading screen
                    Lungo.Notification.hide();
                };
                img.src = e.target.result;
            };
            // show loading screen
            Lungo.Notification.show();
            reader.readAsDataURL(file);
        } else {
            alert("FileReaderAPI not supported");
        }
    };
});

Lungo.dom("#create3-add-button").on("tap", function () {
    var date = new Date($$("#create3-add-date").val());
    var currency, expenseLocation;
    if ($$("#create3-tab-domestic").hasClass("active")) {
        currency = "EUR";
        expenseLocation = 1;
    } else {
        currency = $$("#create3-add-currency").val();
        expenseLocation = 2;
    }

    var expense = {
        "date": date.toISOString(),
        "projectCode": $$("#create3-add-project-code").val(),
        "currency": currency,
        "amount": parseFloat($$("#create3-add-amount").val()),
        "remarks": $$("#create3-add-remarks").val(),
        "expenseTypeId": parseInt($$("#create3-add-type").val()),
        "expenseLocationId": expenseLocation,
        "evidence": Lungo.Data.Storage.session("tempEvidence")
    };

    var localExpenses = Lungo.Data.Storage.persistent("localExpenses");
    if (!localExpenses) {
        Lungo.Data.Storage.persistent("localExpenses", [expense]);
    } else {
        localExpenses.push(expense);
        Lungo.Data.Storage.persistent("localExpenses", localExpenses);
    }
    Lungo.Data.Storage.session("tempEvidence", null);
    Lungo.Router.section("create2");
});

Lungo.dom("#create3-tab-abroad").on("tap", function () {
    $$("#create3-add-currency").parent().parent().show();
    $$("#create3-add-converted").parent().show();
    toggleNavigation();
    $$("#create3-add-type").append("<option value=\"2\">Lunch</option>");
    $$("#create3-add-type").append("<option value=\"3\">Diner</option>");
    $$("#create3-add-type").append("<option value=\"4\">Ticket</option>");
});

Lungo.dom("#create3-tab-domestic").on("tap", function () {
    $$("#create3-add-currency").parent().parent().hide();
    $$("#create3-add-converted").parent().hide();
    toggleNavigation();
    $$("#create3-add-type").find("option[value='2']").remove();
    $$("#create3-add-type").find("option[value='3']").remove();
    $$("#create3-add-type").find("option[value='4']").remove();
});

function toggleNavigation() {
    $$("#create3-tab-domestic").toggleClass("active");
    $$("#create3-tab-abroad").toggleClass("active");
}