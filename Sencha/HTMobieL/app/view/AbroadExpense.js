/*
 * File: app/view/AbroadExpense.js
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

Ext.define('Expense.view.AbroadExpense', {
    extend: 'Ext.Container',
    alias: 'widget.abroadexpense',

    config: {
        scrollable: 'vertical',
        items: [
            {
                xtype: 'fieldset',
                title: '3. Add Expense',
                items: [
                    {
                        xtype: 'datepickerfield',
                        id: 'date',
                        label: 'Date Of Expense',
                        placeHolder: 'mm/dd/yyyy',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        id: 'projectcode',
                        label: 'Project Code',
                        readOnly: true
                    },
                    {
                        xtype: 'radiofield',
                        id: 'hotel',
                        label: 'Hotel'
                    },
                    {
                        xtype: 'radiofield',
                        id: 'lunch',
                        label: 'Restaurant (Diner)'
                    },
                    {
                        xtype: 'radiofield',
                        id: 'other',
                        label: 'Other (please specify)'
                    },
                    {
                        xtype: 'textfield',
                        id: 'amount',
                        label: 'Amount',
                        readOnly: true
                    },
                    {
                        xtype: 'selectfield',
                        label: 'Currency'
                    },
                    {
                        xtype: 'textareafield',
                        id: 'remarks',
                        label: 'Remarks',
                        readOnly: true
                    },
                    {
                        xtype: 'button',
                        height: 43,
                        id: 'back',
                        ui: 'action-round',
                        width: 230,
                        iconCls: 'download',
                        iconMask: true,
                        text: 'Upload Evidence'
                    },
                    {
                        xtype: 'button',
                        height: 46,
                        ui: 'confirm',
                        width: 229,
                        iconCls: 'add',
                        iconMask: true,
                        text: 'Add'
                    }
                ]
            }
        ]
    }

});