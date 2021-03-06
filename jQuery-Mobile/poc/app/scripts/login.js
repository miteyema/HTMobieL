$(document).on("pageinit", "#login", function () {
    $("#login-form").validate({

        // needed for bug that otherwhise shows keyboard and dialog
        // at the same time on a smartphone
        focusInvalid:false,

        // no real time validation checking needed
        onkeyup:false,
        onfocusout:false,

        // custom highlight function
        highlight:function (element, errorClass, validClass) {
            var $element = $(element);
            $element.parent().addClass("red-border");
        },

        // custom unhighlight function
        unhighlight:function (element, errorClass, validClass) {
            var $element = $(element);
            $element.parent().removeClass("red-border");
        },

        errorPlacement:function () {
            // no body, because we want no error labels on the form
        },

        showErrors:function (errorMap) {
            EA.prepareValidationError(this, errorMap);
        },

        invalidHandler:function () {
            $.mobile.changePage("#error-validation");
        },

        submitHandler:function () {
            $.ajax({
                type:"POST",
                dataType:"text",
                url:EA.baseURL + "resources/userService/login",
                data:{
                    'email':$("#login-username").val(),
                    'password':$("#login-password").val()
                },
                beforeSend:function () {
                    $.mobile.loading("show", {
                        text:"Logging in",
                        textVisible:true
                    });
                },
                error:function () {
                    // don't write the loading hide in a complete handler,
                    // because we chain the ajax requests
                    $.mobile.loading("hide");

                    // show error
                    EA.showBackendError("Could not log in.");
                },
                success:function (token) {
                    // don't write the loading hide in a complete handler,
                    // because we chain the ajax requests
                    $.mobile.loading("hide");

                    if (token == '') {
                        EA.showBackendError("The username and/or password are incorrect.");
                    } else {
                        // set the token
                        EA.setToken(token);

                        // empty form
                        $("#login-form")[0].reset();

                        // don't go to the home page yet, but first fetch user info
                        $.ajax({
                            type:"POST",
                            dataType:"json",
                            url:EA.baseURL + "resources/userService/getEmployee",
                            data:{
                                'token':EA.getToken()
                            },
                            beforeSend:function () {
                                $.mobile.loading("show", {
                                    text:"Fetching user data",
                                    textVisible:true
                                });
                            },
                            error:function () {
                                // don't write the loading hide in a complete handler,
                                // because we chain the ajax requests
                                $.mobile.loading("hide");

                                EA.showBackendError("Could not fetch user information");
                            },
                            success:function (userData) {
                                // don't write the loading hide in a complete handler,
                                // because we chain the ajax requests
                                $.mobile.loading("hide");
                                // set user data and go to home page
                                EA.setUser(userData);
                                $.mobile.changePage("#home");
                            }
                        });

                        // fetch projectcodes asynchronous at logon time
                        $.ajax({
                            type:"POST",
                            dataType:"json",
                            url:EA.baseURL + "resources/expenseService/getProjectCodeSuggestion",
                            data:{
                                "keyword":""
                            },
                            error:function () {
                                EA.showBackendError("Could not fetch project codes.");
                            },
                            success:function (json) {
                                if (json != null) {
                                    EA.setProjectCodeSuggestions(json.data);
                                } else {
                                    // silent fail
                                    // it could happen that there are no project codes yet
                                    console.log("No project code suggestions were returned.");
                                }
                            }
                        });

                        // fetch currencies asynchronous at logon time
                        $.ajax({
                            type:"POST",
                            dataType:"xml",
                            url:EA.baseURL + "resources/currencyService/getCurrencies",
                            error:function () {
                                EA.showBackendError("Could not fetch currencies.");
                            },
                            success:function (xml) {
                                var currencies = [];
                                // gets the cube block
                                var $xml = $("Cube", xml);
                                // gets the cube block with time attribute
                                $xml = $("Cube", $xml);

                                // iterate over each entry to get currency and rate
                                $xml.find("Cube").each(function () {
                                    var $this = $(this);
                                    currencies.push({
                                        name:$this.attr("currency"),
                                        rate:parseFloat($this.attr("rate"))
                                    });
                                });
                                EA.setCurrencies(currencies);
                            }
                        });
                    }
                }
            });
        }
    });
});