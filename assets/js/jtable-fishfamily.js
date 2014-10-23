$(document).ready(function () {
    // function to prepare JTable
    var makeJTable = function() {
	$('#FishFamilyTableContainer').jtable({
	    title: 'List of fish families',
	    actions: {
		listAction:   '/fishfamily/list',
		createAction: '/fishfamily/create',
		updateAction: '/fishfamily/update',
		deleteAction: '/fishfamily/destroy'
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
