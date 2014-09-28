$(document).ready(function () {
    // function to prepare JTable
    var makeJTable = function() {
	$('#PricetierTableContainer').jtable({
	    title: 'List of available pricetiers',
	    actions: {
		listAction:   '/pricetier/list?_csrf='+_csrf,
		createAction: '/pricetier/create?_csrf='+_csrf,
		updateAction: '/pricetier/update?_csrf='+_csrf,
		deleteAction: '/pricetier/destroy?_csrf='+_csrf
	    },
	    fields: {
		code: {
		    key: true,
		    title: 'Code',
		    width: '20%',
		    create: true,
		    edit: true
		},
		name: {
		    title: 'Pricetier',
		    width: '50%'
		},
		accountCode: {
		    title: 'Autocount account code',
		    width: '30%'
		}
	    }
	});

	$('#PricetierTableContainer').jtable('load');
    };

    makeJTable();

});
