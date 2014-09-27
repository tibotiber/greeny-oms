$(document).ready(function () {
    // function to prepare JTable
    var makeJTable = function() {
	$('#CurrencyTableContainer').jtable({
	    title: 'List of available currencies',
	    actions: {
		listAction:   '/currency/list?_csrf='+_csrf,
		createAction: '/currency/create?_csrf='+_csrf,
		updateAction: '/currency/update?_csrf='+_csrf,
		deleteAction: '/currency/destroy?_csrf='+_csrf
	    },
	    fields: {
		id: {
		    key: true,
		    list: false
		},
		code: {
		    title: 'Code',
		    width: '20%'
		},
		name: {
		    title: 'Currency',
		    width: '50%'
		},
		rate: {
		    title: 'Rate to SGD',
		    width: '30%'
		}
	    }
	});

	$('#CurrencyTableContainer').jtable('load');
    };

    makeJTable();

});
