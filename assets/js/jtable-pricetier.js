$(document).ready(function () {
    // function to prepare JTable
    var makeJTable = function(_csrf) {
	$('#PricetierTableContainer').jtable({
	    title: 'List of available pricetiers',
	    actions: {
		listAction:   '/pricetier/list?_csrf='+_csrf,
		createAction: '/pricetier/create?_csrf='+_csrf,
		updateAction: '/pricetier/update?_csrf='+_csrf,
		deleteAction: '/pricetier/destroy?_csrf='+_csrf
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

    // get csrf token before making the JTable
    io.socket.get('/csrfToken', function(res) {
	makeJTable(res._csrf);
    });
});
