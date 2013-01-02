/*
 * File: app/view/AddExpenseContainer.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Expense.view.AddExpenseContainer', {
    extend: 'Ext.Container',
    alias: 'widget.addexpensecontainer',

    requires: [
        'Expense.view.AbroadExpense',
        'Expense.view.DomesticExpense'
    ],

    config: {
        items: [
            {
                xtype: 'tabpanel',
                docked: 'top',
                height: 1000,
                ui: 'light',
                layout: {
                    animation: 'pop',
                    type: 'card'
                },
                items: [
                    {
                        xtype: 'abroadexpense',
                        title: 'Abroad'
                    },
                    {
                        xtype: 'domesticexpense',
                        title: 'Domestic'
                    }
                ],
                tabBar: {
                    docked: 'top',
                    layout: {
                        pack: 'center',
                        type: 'hbox'
                    }
                }
            }
        ]
    }

});