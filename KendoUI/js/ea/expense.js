//example at http://www.kendoui.com/blogs/teamblog/posts/12-03-09/bind_this_a_look_at_kendo_ui_mvvm.aspx
var expenseForm = kendo.observable({
    // expenses array will hold the grid values
    expenses:
    [
        {
            date: kendo.toString(new Date(),"dd/MM/yyyy"),
            amount: 50,
            currency: "EUR",
            rate: 1,
            expenseId: 0,
            remarks: "test",
            expenseTypeId: 5,
            projectCode: "GZ0565",
            expenseLocationId: 1
        },
        {
            date: kendo.toString(new Date(),"dd/MM/yyyy"),
            amount: 100,
            currency: "USD",
            rate: 1.5,
            expenseId: 1,
            remarks: "test",
            expenseTypeId: 1,
            projectCode: "GZ0565",
            expenseLocationId: 2
        }
    ],

    // the values are bound to the merchant and amount fields
    date: new Date(),
    projectCode: null,
    expenseTypeId: null,
    amount: null,
    currency: null,
    rate: null,
    remarks: null,
    expenseLocationId: 1,

    // event execute on click of add button
    create: function(e) {
        //console.log($("#expense-evidence").data("kendoUpload"));
        if(this.get("currency")==null){
            this.set("currency",{
                currency: "EUR",
                rate: 1
            });
            this.set("expenseLocationId",2); //If EURO is used as currency,  we have a domestic expense
        }
        this.get("expenses").push({
            date: kendo.toString(this.get("date"),"dd/MM/yyyy"),
            projectCode: this.get("projectCode"),
            expenseTypeId: this.get("expenseTypeId"),
            amount: this.get("amount"),
            currency: this.get("currency").get("currency"),
            rate: this.get("currency").get("rate"),
            remarks: this.get("remarks"),
            expenseLocationId: this.get("expenseLocationId"),
            expenseId: this.get("expenses").length //Id voor ophalen van expense bij overview
        });
        //reset the form
        this.set("date",new Date());
        this.set("projectCode",null);
        this.set("expenseTypeId",null);
        this.set("amount",null);
        this.set("currency",null);
        this.set("rate",null);
        this.set("remarks",null);
        this.set("expenseLocationId",1);
        //kendo.bind($("#overview-list"),expenseForm);
    }

});

function convertCurrencyToEuro(curr,value,rate){
    if(curr=="EUR")
        return value;
    else{
        var newAmount = value / rate;
        newAmount = Math.round(newAmount*100)/100;
        return newAmount;
    }
}

var expenseMV = kendo.observable();

function showExpenseDetail(e) {
    var expense = expenseForm.expenses[e.view.params.expenseId];
    var listviews = this.element.find("ul.km-listview");
    $("#overview-location-button").kendoMobileButtonGroup({
        select: function(e) {
            //TODO button group klikken wijzigt geselecteerde knop niet!
        },
        index: expense.expenseLocationId-1 //1 = DOMESTIC, 2 = ABROAD
    });
    /*
        De content van de tab die hoort bij de geselecteerde index ophalen door de index
        te zetten of $("#overview-location-button").data("kendoMobileButtonGroup").select(...)
        op te roepen werkt niet.
        via jQuery code expliciet zeggen welke view toonbaar moet zijn!
    */
    listviews.hide().eq(expense.expenseLocationId-1).show();
    expenseMV.set("date",expense.date);
    expenseMV.set("projectCode", expense.projectCode);
    expenseMV.set("expenseTypeId", expense.expenseTypeId);
    expenseMV.set("amount",expense.amount);
    expenseMV.set("currency", expense.currency);
    expenseMV.set("remarks", expense.remarks);
}

// when the users clicks on an expense form, download it in PDF-format
$(document).on("click", "[id^=my-expenses-show-pdf]", function () {
    if (navigator.onLine) {
        var $hiddenForm = $('#my-expenses-form');

        var url = EA.baseURL + "resources/expenseService/getExpenseFormPDF";
        $hiddenForm[0].setAttribute('action', url);

        // get the id of the form that is requested
        var expenseFormId = $(this).attr("id").replace("my-expenses-show-pdf-", "");
        // guideline: AJAX is not for fetching raw data like a PDF.
        // to accomplish this, a hidden form is used and the requested data is
        // copied into that hidden form
        $("#my-expenses-token").val(EA.getToken());
        $("#my-expenses-form-id").val(expenseFormId);

        // submit that hidden form so the PDF will be downloaded
        $hiddenForm.submit();
    }
});

function expenseStatusIdToString(id) {
    if (id == 1) {
        return "New";
    } else if (id == 2) {
        return "Verified";
    } else if (id == 3) {
        return "Approved";
    } else if (id == 4) {
        return "Paid out";
    } else if (id == 5) {
        return "Disapproved";
    } else {
        return "ERROR_STATUS";
    }
}