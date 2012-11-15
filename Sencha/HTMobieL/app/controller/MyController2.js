/*
 * File: app/controller/MyController2.js
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

Ext.define('Expense.controller.MyController2', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            myinfo: 'infofield'
        },

        control: {
            "#infofield": {
                initialize: 'onFieldsetInitialize',
                show: 'onFieldsetShow'
            }
        }
    },

    onFieldsetInitialize: function(component, options) {
        /*console.log(component);

        var emp = Ext.create('Ext.model.Employee',{
        firstName: "Sander",
        lastName: "Van Loock",
        employeeNumber: 123456,
        unit: "G6",
        email: "sandervanloock@capgemini.com"
        });


        component.setRecord(emp);*/
    },

    onFieldsetShow: function(component, options) {
        console.log(component);

        var emp = Ext.create('Ext.model.Employee',{
            firstName: "Sander",
            lastName: "Van Loock",
            employeeNumber: 123456,
            unit: "G6",
            email: "sandervanloock@capgemini.com"
        });


        component.setRecord(emp);
    }

});