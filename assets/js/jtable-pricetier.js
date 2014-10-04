$(document).ready(function () {
    // function to prepare JTable
    var makeJTable = function() {
	$('#PricetierTableContainer').jtable({
	    title: 'List of available pricetiers',
	    actions: {
		listAction:   '/pricetier/list?_csrf='+_csrfURL,
		createAction: '/pricetier/create?_csrf='+_csrfURL,
		updateAction: '/pricetier/update?_csrf='+_csrfURL,
		deleteAction: '/pricetier/destroy?_csrf='+_csrfURL
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
	    },
	    formCreated: function(event, data) {
		$('.jtable-input-field-container').each(function() {
		    $(this).addClass('form-group');
		});
		$('.jtable-input').each(function() {
		    $(this).find('*').addClass('form-control');
		});
		PricetierFormValidator();
	    },
	    formSubmitting: function(event, data) {
		$('.jtable-dialog-form').data('bootstrapValidator').validate();
		return $('.jtable-dialog-form').data('bootstrapValidator').isValid();
	    },
	    formClosed: function(event, data) {
		$('.jtable-dialog-form').data('bootstrapValidator').destroy();
	    }
	});

	$('#PricetierTableContainer').jtable('load');
    };

    makeJTable();

});
