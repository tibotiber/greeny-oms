$(document).ready(function () {
    // function to prepare JTable
    var makeJTable = function() {
	$('#PricetierTableContainer').jtable({
	    title: 'List of available pricetiers',
	    actions: {
		listAction:   '/pricetiers/list',
		createAction: '/pricetiers/create',
		updateAction: '/pricetiers/update',
		deleteAction: '/pricetiers/destroy'
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
		    width: '40%'
		},
		preferredCurrency: {
		    title: 'Preferred Currency',
		    options: '/currencies/picker?format=jtable&_csrf='+_csrfURL,
		    width: '20%'
		},
		accountCode: {
		    title: 'Autocount account code',
		    width: '20%'
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
