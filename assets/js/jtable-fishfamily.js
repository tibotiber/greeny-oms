$(document).ready(function () {
    // function to prepare JTable
    var makeJTable = function(_csrf) {
	$('#FishFamilyTableContainer').jtable({
	    title: 'List of fish families',
	    actions: {
		listAction:   '/fishfamily/list?_csrf='+_csrf,
		createAction: '/fishfamily/create?_csrf='+_csrf,
		updateAction: '/fishfamily/update?_csrf='+_csrf,
		deleteAction: '/fishfamily/destroy?_csrf='+_csrf
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
		    title: 'Family Name',
		    width: '80%'
		}
	    }
	});

	$('#FishFamilyTableContainer').jtable('load');
    };

    // get csrf token before making the JTable
    io.socket.get('/csrfToken', function(res) {
	makeJTable(res._csrf);
    });
});
