
Ext.define('Expense.store.EmployeeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.employeestore',

    requires: [
        'Expense.model.Employee'
    ],

    config: {
        model: 'Expense.model.Employee',
        storeId: 'employeestore',
        listeners: {
           load: 'initApplication',
           updaterecord: 'initApplication',
           addrecords: 'initApplication'
        },
        proxy: {
            type: 'ajax',
            url: Expense.app.getBaseURL() + '/resources/userService/getEmployee',
            actionMethods: {
                create : 'POST',
                read   : 'POST',
                update : 'POST',
                destroy: 'POST'
            },
            reader: {
                type: 'json'
            }
        }
    },
    
	 initApplication : function(comp, records, successful, operation, eOpts ){
		 	var employeeStore = comp;
			var employee = employeeStore.getAt(0);
			Expense.app.setEmployee(employee);
		    
		    Ext.getCmp('introtext').setHtml('Welcome, ' + employee.get('firstName') + '<br> I want to: <br>');

			initializeInfoPanel(employee);
			
			Ext.Viewport.setActiveItem(Ext.getCmp('home'));
			
			var expenseStore = Ext.getStore('expensestore');
			expenseStore.getProxy().setExtraParams({
				token: Expense.app.getToken()
			});
			expenseStore.load();
			
			var expenseStore = Ext.getStore('expenseformstore');
			expenseStore.getProxy().setExtraParams({
				token: Expense.app.getToken()
			});
			expenseStore.load();
			
	 }
   
});

Number.prototype.mod = function(n) {
	return ((this%n)+n)%n;
};

initializeInfoPanel = function(employee){
	var infopanel = Ext.getCmp('infopanel');
	infopanel.setRecord(employee); 
	var today = new Date();
	infopanel.getComponent('infofield').getComponent('year').setOptions(
			[{text: today.getFullYear()-1, value: today.getFullYear()-1},
			 {text: today.getFullYear(), value: today.getFullYear()},
			 {text: today.getFullYear()+1, value: today.getFullYear()+1}]);
	if(today.getUTCDate() > 14){
		infopanel.getComponent('infofield').getComponent('month').setValue(today.getUTCMonth().mod(12)+'');
		infopanel.getComponent('infofield').getComponent('year').setValue(today.getFullYear());
	}
	else{ //zet vorige maand
		infopanel.getComponent('infofield').getComponent('month').setValue((today.getUTCMonth()-1).mod(12)+'');
		if(infopanel.getComponent('infofield').getComponent('month').getValue() == '11')
			infopanel.getComponent('infofield').getComponent('year').setValue(today.getFullYear()-1);
		else //zet vorig jaar
			infopanel.getComponent('infofield').getComponent('year').setValue(today.getFullYear());
	}
};

