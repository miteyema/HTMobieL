function gotoOverview(){
    var validator = $("#yourInfo").kendoValidator().data("kendoValidator");
    if (validator.validate()) //A valid employee is filled in
        $("#main-pane").data("kendoMobilePane").navigate("#overview");
    else
        EA.showError(validator.errors());
}

/*
* Sluit de popup
* */
function closeModalView(e) {
    // find the closest modal view, relative to the button element.
    var modalView = e.sender.element.closest("[data-role=modalview]").data("kendoMobileModalView");
    modalView.close();
}

function clearSavedExpenses(e){
    var modalView = e.sender.element.closest("[data-role=modalview]").data("kendoMobileModalView");
    localStorage.removeItem("expenses");
    modalView.close();
}

function gotoNewExpenseForm(){
    if(Modernizr.localstorage && localStorage.getItem("expenses")!=null){
        var modalView = $("#confirmation").data("kendoMobileModalView");
        modalView.open();
    }
    if(isPhone)
        app.navigate("#side-root");
    else
        app.navigate("#newExpense");
}

var expenseFormDataSource = new kendo.data.DataSource({
    transport: {
        read: function(options){
            app.showLoading();
            $.ajax({
                url: EA.baseURL + "resources/expenseService/getExpenseForms",
                dataType: "xml",
                type: "POST",
                data: {
                    token: EA.getToken()
                },
                success: function(result,textstatus,jqXHR) {
                    // notify the data source that the request succeeded
                    if(jqXHR.status==204)
                        $("#expenseFormList").html("<h2>No expenseForms submitted</h2>");
                    else
                        options.success(result);
                },
                error: function(result) {
                    // notify the data source that the request failed
                    options.error(result);
                },
                complete: function(jqXHR, textStatus){
                    app.hideLoading();

                }
            })
        }
    },
    schema: {
        type: "xml",
        data: "expenseForms/expenseForm", // the data which the data source will be bound to is in the "results" field
        model: {
            fields: {
                id: "id/text()",
                date: "date/text()",
                statusId: "statusId/text()"
            }
        }
    },
    sort: {field: "date", dir: "desc"}
});

var currencySource = new kendo.data.DataSource({
    transport: {
        read: {
            url:  EA.baseURL + "resources/currencyService/getCurrencies",
            dataType: "xml",
            type:"POST"
        }
    },
    schema: { // describe the result format
        type: "xml",
        data: "/gesmes:Envelope/Cube/Cube/Cube", // the data which the data source will be bound to is in the "results" field
        model: {
            // configure the fields of the object
            fields: {
                currency: "@currency",
                rate: "@rate"
            }
        }
    }
});

/*
* Initialization methods
*/

function loginInit(){
    if(EA.hasUser())
        app.navigate("#home");
}

function homeInit(){
    //kendo.bind($("#welcome-name"),employee,kendo.mobile.ui);
}

function yourInfoViewInit(){
    var currDate = new Date(new Date().getFullYear(),new Date().getMonth(),1);
    if(new Date().getUTCDate()<15)
        currDate.setDate(currDate.getDate()-30);
    $("#your-info-date").kendoDatePicker({
        // defines the start view
        start: "year",
        // defines when the calendar should return date
        depth: "year",
        value: currDate,
        // display month and year in the input
        format: "MMMM yyyy"
    });
}


function overviewInit(){
    $("#overview-list").kendoMobileListView({
        dataSource: expenseDataSource,
        template: $("#overview-template").text()
    });
};

function showOverview(){
    expenseDataSource.read();
};

function addExpenseViewInit(e) {
    e.view.useNativeScrolling = true; //TODO TESTEN scrolling

    //Necessary for the Abroad / Domestic switch (found in examples)
    var listviews = this.element.find("ul.km-listview");
    $("#expense-location-button").kendoMobileButtonGroup({
        select: function(e) {
            listviews.hide().eq(this.selectedIndex).show();
            expense.set("expenseLocationId",this.selectedIndex+1);
        },
        index: expense.get("expenseLocationId")-1
    });

    //Date picker from now till two months earlier
    var startDate = new Date();
    startDate.setDate(startDate.getDate()-60);
    $("#abroad-expense-date").kendoDatePicker({
        value: new Date(),
        min: startDate,
        max: new Date(),
        format: "dd/MM/yyyy"
    });
    $("#domestic-expense-date").kendoDatePicker({
        value: new Date(),
        min: startDate,
        max: new Date(),
        format: "dd/MM/yyyy"
    });

    $("#abroad-expense-project-code").kendoAutoComplete({
        placeholder: 'Project Code',
        dataSource: new kendo.data.DataSource({
            type: "json", // specifies data protocol
            transport: {
                read: {
                    url:  EA.baseURL + "/resources/expenseService/getProjectCodeSuggestion",
                    type: "POST"
                },
                parameterMap: function(options) {
                    return {
                        keyword: $("#abroad-expense-project-code").val()
                    };
                }
            },
            schema: { // describe the result format
                type: "json",
                data: "data"
            }
        })
    });

    $("#domestic-expense-project-code").kendoAutoComplete({
        placeholder: 'Project Code',
        dataSource: new kendo.data.DataSource({
            type: "json", // specifies data protocol
            transport: {
                read: {
                    url:  EA.baseURL + "/resources/expenseService/getProjectCodeSuggestion",
                    type: "POST"
                },
                parameterMap: function(options) {
                    return {
                        keyword: $("#domestic-expense-project-code").val()
                    };
                }
            },
            schema: { // describe the result format
                type: "json",
                data: "data"
            }
        })
    });

    $("#abroad-expense-currency").kendoDropDownList({
        index: 0,
        dataSource: currencySource,
        dataTextField: "currency",
        dataValueField: "rate",
        optionLabel: "Currency"
    });

    $("#domestic-expense-currency").kendoDropDownList({
        index: 0,
        dataSource: currencySource,
        dataTextField: "currency",
        dataValueField: "rate",
        optionLabel: "Currency"
    });

    $("#abroad-expense-evidence").kendoUpload({
        multiple: false
    });

    $("#domestic-expense-evidence").kendoUpload({
        multiple: false
    });
}

function signAndSendViewInit(){
    //kendo.bind($("#signAndSend"),expenseForm,kendo.mobile.ui);
    // when this line is in pagebeforeshow, it cannot know
    // width and heigh of the page, therefore it is placed here, but
    // because this code is executed everytime the page is viewed,
    // multiple signature fields would come up,
    // so we just check if the canvas is there or not
    if (  $("#sign-and-send-signature").find("canvas").length == 0) {
        $("#sign-and-send-signature").jSignature();
    }
}

function initExpenseFormOverview() {
    console.log("init");
    expenseFormDataSource.read();
    $("#expenseFormList").kendoMobileListView({
        dataSource: expenseFormDataSource,
        pullToRefresh: true,
        template: $("#expenseForm-template").text(),
        style: "inset"
    });
};