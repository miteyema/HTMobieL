/*
 * File: app/model/Expense.js
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

Ext.define('Expense.model.Expense', {
    extend: 'Ext.data.Model',
    alias: 'model.expense',

    config: {
        fields: [
            {
                name: 'type',
                type: 'boolean'
            },
            {
                name: 'doe',
                dateFormat: 'd/m/Y',
                type: 'date'
            },
            {
                name: 'projectCode',
                type: 'string'
            },
            {
                name: 'amount',
                type: 'float'
            },
            {
                name: 'remarks',
                type: 'string'
            },
            {
                name: 'currency',
                type: 'string'
            }
        ]
    }
});