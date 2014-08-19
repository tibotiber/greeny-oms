$(document).ready(function () {
    // function to prepare JTable
    var makeJTable = function(_csrf) {
	console.log("making table with csrf token: "+_csrf);
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

    // get csrf token before making the JTable
    io.socket.get('/csrfToken', function(res) {
	makeJTable(res._csrf);
    });
});
