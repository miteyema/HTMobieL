/*
 * File: app/view/Sign.js
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

Ext.define('Expense.view.Sign', {
    extend: 'Ext.Container',
    alias: 'widget.sign',

    config: {
        items: [
            {
                xtype: 'fieldset',
                title: '4. Sign & Send',
                items: [
                    {
                        xtype: 'textareafield',
                        label: 'Signature'
                    },
                    {
                        xtype: 'textareafield',
                        label: 'Remarks'
                    },
                    {
                        xtype: 'togglefield',
                        label: 'Status notification via Email:'
                    },
                    {
                        xtype: 'button',
                        text: 'Send'
                    }
                ]
            }
        ]
    }

});