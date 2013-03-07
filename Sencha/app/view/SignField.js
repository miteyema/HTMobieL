/*
 * File: app/view/SignField.js
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

Ext.define('Expense.view.SignField', {
    extend: 'Ext.form.Panel',
    alias: 'widget.signfield',

    config: {
        title: '4. Sign & Send',
        items: [
            {
                xtype: 'fieldset',
                id: 'signfield',
                items: [
                    {
                        xtype: 'signaturefield',
                        id: 'signature',
                        sigWidth: 450,
                        sigHeight: 300
                    },
                    {
                        xtype: 'textareafield',
                        name: 'remarks',
                        placeHolder: 'Remarks'
                    },
                    {
                        xtype: 'togglefield',
                        name: 'notification',
                        value: true,
                        label: 'Status notification via Email:'
                    }
            ]},
            {
                xtype: 'button',
                text: 'Send',
                ui: 'action',
                width: '200px',
                right: '0px',
                action: 'sendExpenses'
            }
        ]
    }

});