$(document).ready(function () {
    // function to prepare JTable
    var makeJTable = function() {
	$('#CurrencyTableContainer').jtable({
	    title: 'List of available currencies',
	    actions: {
		listAction:   '/currency/list?_csrf='+_csrfURL,
		createAction: '/currency/create?_csrf='+_csrfURL,
		updateAction: '/currency/update?_csrf='+_csrfURL,
		deleteAction: '/currency/destroy?_csrf='+_csrfURL
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
		    title: 'Currency',
		    width: '50%'
		},
		rate: {
		    title: 'Rate to SGD',
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
		CurrencyFormValidator();
	    },
	    formSubmitting: function(event, data) {
		$('.jtable-dialog-form').data('bootstrapValidator').validate();
		return $('.jtable-dialog-form').data('bootstrapValidator').isValid();
	    },
	    formClosed: function(event, data) {
		$('.jtable-dialog-form').data('bootstrapValidator').destroy();
	    }
	});

	$('#CurrencyTableContainer').jtable('load');
    };

    makeJTable();

});
