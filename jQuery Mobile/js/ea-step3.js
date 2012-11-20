$(document).on("pageinit", "#step3", function () {

    /**
     * Tabbar Abroad or Domestic
     */
    $("#step3-type-restaurant").parent().hide();

    $("#step3-tabbar-abroad").change(function () {
        console.log("abroad tabbar selected");
        $("#step3-type-train").parent().hide();
        $("#step3-type-restaurant-lunch").parent().hide();
        $("#step3-type-restaurant-diner").parent().hide();
        $("#step3-type-restaurant").parent().show();
    });

    $("#step3-tabbar-domestic").change(function () {
        console.log("domestic tabbar selected");
        $("#step3-type-train").parent().show();
        $("#step3-type-restaurant-lunch").parent().show();
        $("#step3-type-restaurant-diner").parent().show();
        $("#step3-type-restaurant").parent().hide();
    });

    /**
     * Autocomplete for project code
     */
    $("#step3-project-code").autocomplete({
        target:$("#step3-suggestions"),
        source:EA.projectCodeSuggestions,
        callback:function (e) {
            var $a = $(e.currentTarget);
            $('#step3-project-code').val($a.text());
            $("#step3-project-code").autocomplete('clear');
        },
        minLength:1
    });

    /**
     * Form validation
     */
    $("#step3-form").validate({
        rules:{
            "step3-date":{
                required:true
            },
            "step3-project-code":{
                required:true
            },
            "step3-type":{
                required:true
            },
            "step3-amount":{
                required:true,
                min:0 // a negative amount is not valid
            },
            "step3-remarks":{
                required:function () {
                    return $("#step3-type-other").is(":checked");
                }
            }
        },
        focusInvalid:false,
        submitHandler:function (form) {
            $.mobile.changePage("#step4");
        },
        invalidHandler:function (form, validator) {
            EA.showErrorDialog("Validation error", "Some of the fields were not filled in correctly. Please correct the indicated fields.");
        }
    });

});