var signature = false;

$(document).on("pageshow", "#sign-and-send", function () {
    // hold local reference for performance
    var $signature = $("#sign-and-send-signature");

    // when this line is in pagebeforeshow, it cannot know
    // width and heigh of the page, therefore it is placed here, but
    // because this code is executed everytime the page is viewed,
    // multiple signature fields would come up,
    // so we just check if the canvas is there or not
    if ($signature.find("canvas").length == 0) {
        // no signature canvas was present, make one
        $signature.jSignature();
    }
    //$signature.jSignature("reset");

    // load local data if available
    if (EA.hasExpenseForm()) {
        // load data into form
        var expenseForm = EA.getExpenseForm();

        // check if the status notification via email was already set
        if (expenseForm.notification != null && !expenseForm.notification) {
            var $notification = $("#sign-and-send-notification");
            $notification.find("option[value=on]").attr("selected", false);
            $notification.find("option[value=off]").attr("selected", true);
            $notification.slider("refresh");
        }

        // load signature if already saved
        /*if (expenseForm.signature != null) {
         $signature.jSignature("setData", EA.base64WithPrefix(expenseForm.signature));
         }*/
    }
});

$(document).on("click", "#sign-and-send-signature-reset", function () {
    // clear the signature when user wants to redraw it
    $("#sign-and-send-signature").jSignature("reset");
});

$(document).on("change", "#sign-and-send-signature", function (e) {
    // https://github.com/brinley/jSignature/issues/19#issuecomment-7012991
    signature = $(e.target).jSignature('getData', 'native').length;
});

$(document).on("pageinit", "#sign-and-send", function () {

    // form validation
    $("#sign-and-send-form").validate({
        submitHandler: function (form) {
            var notification = $("#sign-and-send-notification").val() == "on";

            // save data to expense form
            var expenseForm = {};
            expenseForm.date = new Date().toISOString();
            expenseForm.employeeId = EA.getUser().id;
            expenseForm.signature = EA.base64WithoutPrefix($("#sign-and-send-signature").jSignature("getData"));
            expenseForm.remarks = $("#sign-and-send-remarks").val();
            expenseForm.notification = notification;
            EA.setExpenseForm(expenseForm);

            // check the expenses
            var expenses = EA.getLocalExpenses();

            if (expenses.length == 0) {
                // there are no expenses attached to this form
                EA.showDialog("No expenses", "You haven't attached any expenses to your form. Please do so.");
            } else if (!signature) {
                EA.showDialog("No signature", "You haven't filled in a signature. Please do so.");
            } else {
                if (!navigator.onLine) {
                    EA.showDialog("Offline", "You are currently offline. Your expense will be saved, please come back later to resend your expense.");
                } else {
                    // attach expenses to the request
                    expenseForm.expenses = expenses;

                    // prepare the request
                    var expenseRequest = {};
                    expenseRequest.token = EA.getToken();
                    expenseRequest.expenseForm = expenseForm;

                    console.log("Request: " + JSON.stringify(expenseRequest).length);
                    console.log("Signature: " + expenseForm.signature.length);
                    console.log("Expense[0]: " + expenses[0].evidence.length);

                    // send it
                    $.ajax({
                        type: "POST",
                        url: EA.baseURL + "resources/expenseService/saveExpense",
                        data: JSON.stringify(expenseRequest),
                        //dataType:"json",
                        contentType: "application/json",
                        beforeSend: function () {
                            // show spinner and text while uploading
                            $.mobile.loading("show", {
                                text: "Uploading expense form",
                                textVisible: true
                            });
                        },
                        success: function () {
                            $.mobile.loading("hide");
                            clearAndShowSuccess();
                        },
                        error: function () {
                            $.mobile.loading("hide");
                            EA.showBackendError("Could not send expense to server");
                        }
                    });
                }
            }
        }
    });
});

function clearAndShowSuccess() {
    // show success dialog
    $.mobile.changePage("#success");

    // clear the form
    $("#sign-and-send-form")[0].reset();
    $("#sign-and-send-signature").jSignature("reset");
    var $notification = $("#sign-and-send-notification");
    $notification.find("option[value=on]").attr("selected", true);
    $notification.find("option[value=off]").attr("selected", false);
    $notification.slider("refresh");

    // clear the draft expense form
    EA.clearExpenseForm();
}

// navigation for smartphones
$(document).on("click", "#sign-and-send-subheader", function () {
    $.mobile.changePage("#add");
});

$(document).on("click", "#success-button", function () {
    $.mobile.changePage("#home");
});