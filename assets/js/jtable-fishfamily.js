$(document).ready(function () {
    // function to prepare JTable
    var makeJTable = function() {
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
	    },
	    formCreated: function(event, data) {
		$('.jtable-input-field-container').each(function() {
		    $(this).addClass('form-group');
		});
		$('.jtable-input').each(function() {
		    $(this).find('*').addClass('form-control');
		});
		FishFamilyFormValidator();
            },
	    formSubmitting: function (event, data) {
		$('.jtable-dialog-form').data('bootstrapValidator').validate();
		return $('.jtable-dialog-form').data('bootstrapValidator').isValid();
	    },
	    formClosed: function (event, data) {
		$('.jtable-dialog-form').data('bootstrapValidator').destroy();
	    }
	});

	$('#FishFamilyTableContainer').jtable('load');
    };

    makeJTable();

});
