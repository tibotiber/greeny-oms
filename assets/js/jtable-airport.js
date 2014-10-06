$(document).ready(function () {
    // function to prepare JTable
    var makeJTable = function() {
	$('#AirportTableContainer').jtable({
	    title: 'List of registered airports',
	    actions: {
		listAction:   '/airport/list?_csrf='+_csrfURL,
		createAction: '/airport/create?_csrf='+_csrfURL,
		updateAction: '/airport/update?_csrf='+_csrfURL,
		deleteAction: '/airport/destroy?_csrf='+_csrfURL
	    },
	    fields: {
		code: {
		    key: true,
		    title: 'Code',
		    width: '10%',
		    create: true,
		    edit: true
		},
		name: {
		    title: 'Airport name',
		    width: '40%'
		},
		town: {
		    title: 'Town',
		    width: '15%'
		},
		country: {
		    title: 'Country',
		    width: '15%'
		},
		timezone: {
		    title: 'Timezone',
		    width: '20%',
		    input: function (data) {
			return $('<input>').attr({
			    type: 'text',
			    name: 'timezone',
			    value: data.value
			}).autocomplete({
			    source: timezones
			});
		    }
		}
	    },
	    formCreated: function(event, data) {
		$('.jtable-input-field-container').each(function() {
		    $(this).addClass('form-group');
		});
		$('.jtable-input').each(function() {
		    $(this).find('*').addClass('form-control');
		});
		AirportFormValidator();
	    },
	    formSubmitting: function(event, data) {
		$('.jtable-dialog-form').data('bootstrapValidator').validate();
		return $('.jtable-dialog-form').data('bootstrapValidator').isValid();
	    },
	    formClosed: function(event, data) {
		$('.jtable-dialog-form').data('bootstrapValidator').destroy();
	    }
	});

	$('#AirportTableContainer').jtable('load');
    };

    makeJTable();

});
