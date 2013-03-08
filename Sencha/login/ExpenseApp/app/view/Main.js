Ext.define('ExpenseApp.view.Main', {
    extend:'Ext.Panel',

    requires:[
        'Ext.TitleBar',
        'Ext.form.FieldSet',
        'Ext.field.Password'
    ],

    config:{
        fullscreen:true,

        items:[
            {
                title:'Expense App',
                xtype:'titlebar'
            },
            {
                xtype:'fieldset',
                items:[
                    {
                        xtype:'textfield',
                        name:'username',
                        placeHolder : 'Username'
                    },
                    {
                        xtype:'passwordfield',
                        name:'password',
                        placeHolder:'Password'
                    },
                    {
                        xtype:'button',
                        text:'Log in',
                        // makes it a green button
                        ui:'confirm'
                    }
                ]
            }
        ]
    }
});
