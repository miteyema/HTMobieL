Ext.define("ExpenseApp.controller.Login", {
    extend:"Ext.app.Controller",

    requires:[
        "ExpenseApp.model.User"
    ],

    config:{
        refs:{
            form:"#loginForm",
            btn:"#loginButton"
        },

        control:{
            btn:{
                tap:"login"
            }
        }
    },

    login:function () {
        // validate the form
        var model = Ext.ModelManager.create(this.getForm().getValues(), "ExpenseApp.model.User");
        var errors = model.validate();

        if (errors.isValid()) {
            console.log("form is valid");
        } else {
            var data = "";
            errors.each(function (item, index, length) {
                data += item.getField() + ' ' + item.getMessage() + "</br>";
            });
            Ext.Msg.alert("Validation Failed", data);
        }
    }

});