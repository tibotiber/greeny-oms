$(document).ready(function() {
    // function to prepare JTable
    var opennedChildTable;

    var makeJTable = function() {
        $('#CustomerTableContainer').jtable({
            title: 'List of customers',
	    //paging: true,
	    //pageSize: 50,
            openChildAsAccordion: true,
            listClass: 'child-opener-image-column',
            actions: {
                listAction  : '/customer/list?_csrf=' + _csrfURL,
		createAction: '/customer/create?_csrf=' + _csrfURL,
		updateAction: '/customer/update?_csrf=' + _csrfURL,
		deleteAction: '/customer/destroy?_csrf=' + _csrfURL
	    },
            fields: {
		prices: {
                    title: '',
                    width: '2%',
                    edit: false,
                    create: false,
                    display: function(customers) {
                        //Create an image that will be used to open child table
			var $img = $('<i class="child-opener-image fa fa-list" title="Show contacts" />');
                        //Open child table when user clicks the image
                        $img.click(function() {
			    if(!$('#CustomerTableContainer').jtable('isChildRowOpen', $img.closest('tr'))) {
				// JTable for prices
				$('#CustomerTableContainer').jtable('openChildTable', $img.closest('tr'), {
                                    title: customers.record.code + ' - Contacts',
                                    showCloseButton: false,
				    actions: {
					listAction    : '/contact/listByCompany?_csrf=' + _csrfURL+'&company='+customers.record.code,
					createAction  : '/contact/create?_csrf=' + _csrfURL,
					updateAction  : '/contact/update?_csrf=' + _csrfURL,
					deleteAction  : '/contact/destroy?_csrf=' + _csrfURL
                                    },
                                    fields: {
					id: {
					    key: true,
					    list: false
					},
                                        company: {
                                            type: 'hidden',
                                            defaultValue: customers.record.code
                                        },
					name: {
					    title:'Name',
					    width: '25%'
					},
					position: {
					    title: 'Position',
					    width: '20%'
					},
					email: {
					    title: 'Email',
					    width: '40%'
					},
					phone: {
					    title: 'Phone',
					    width: '15%'
					},
					main: {
					    title: 'Main contact',
					    type: 'checkbox',
					    values: { 'false': 'No', 'true': 'Yes' },
					    defaultValue: false,
					    list: false
					},
					notes: {
					    title: 'Notes',
					    type: 'textarea',
					    list: false
					}
				    },
				    formCreated: function(event, data) {
					$('.jtable-input-field-container').each(function() {
					    $(this).addClass('form-group');
					});
					$('.jtable-input').each(function() {
					    $(this).find('*').addClass('form-control');
					});
					ContactFormValidator();
				    },
				    formSubmitting: function(event, data) {
					$('.jtable-dialog-form').data('bootstrapValidator').validate();
					return $('.jtable-dialog-form').data('bootstrapValidator').isValid();
				    },
				    formClosed: function(event, data) {
					$('.jtable-dialog-form').data('bootstrapValidator').destroy();
				    },
				    recordUpdated: function(event, data) {
					opennedChildTable.jtable('reload');
				    }
                                }, function(data) {
				    opennedChildTable = data.childTable;
				    opennedChildTable.jtable('load');
                                });
			    } else {
				$('#CustomerTableContainer').jtable('closeChildTable', $img.closest('tr'), function(data) {
				    opennedChildTable = null;
				});
			    }
                        });
                        return $img;
                    }
                },

		code: {
                    title: 'Code',
                    width: '5%',
                    key: true,
		    create: true,
		    edit: true
                },
                name: {
                    title: 'Name',
                    width: '20%'
                },
		country: {
		    title: 'Country',
		    width: '10%'
		},
		email: {
		    title: 'Email',
		    width: '15%'
		},
		phone: {
		    title: 'Phone',
		    width: '10%'
		},
		fax: {
		    title: 'Fax',
		    width: '10%'
		},
		website: {
		    title: 'Website',
		    width: '15%'
		},
		mainContact: {
		    title: 'Main contact',
		    width: '15%',
		    create: false,
		    edit: false
		},
		address: {
		    title: 'Full address',
		    type: 'textarea',
		    list: false
		},
		firstShipment: {
		    title: 'Date of 1st shipment',
		    type: 'date',
		    displayFormat: 'yy-mm-dd',
		    list: false
		},
		transhipper: {
		    title: 'Transhipper',
		    type: 'checkbox',
		    values: { 'false': 'No', 'true': 'Yes' },
		    defaultValue: 'false',
		    list: false
		},
		stockist: {
		    title: 'Stockist',
		    type: 'checkbox',
		    values: { 'false': 'No', 'true': 'Yes' },
		    defaultValue: 'false',
		    list: false
		},
		mixedCodes: {
		    title: 'Allow mixed codes in one box (transhipper)',
		    type: 'checkbox',
		    values: { 'false': 'No', 'true': 'Yes' },
		    defaultValue: 'false',
		    list: false
		},
		boxSize: {
		    title: 'Preferred box size',
		    type: 'radiobutton',
		    options: ['small', 'big'],
		    defaultValue: 'small',
		    list: false
		},
		notes: {
		    title: 'Notes',
		    type: 'textarea',
		    list: false
		}
	    },
	    formCreated: function(event, data) {
		$('.jtable-input-field-container').each(function() {
		    $(this).addClass('form-group');
		});
		$('.jtable-input').each(function() {
		    $(this).find('*').addClass('form-control');
		});
		CustomerFormValidator();
	    },
	    formSubmitting: function(event, data) {
		$('.jtable-dialog-form').data('bootstrapValidator').validate();
		return $('.jtable-dialog-form').data('bootstrapValidator').isValid();
	    },
	    formClosed: function(event, data) {
		$('.jtable-dialog-form').data('bootstrapValidator').destroy();
	    }
        });

        // re-load records when user click search button.
        $('#SearchButton').click(function(e) {
            e.preventDefault();
            $('#CustomerTableContainer').jtable('load', {
                search: $("[name='search']").val().split(' ').join('+')
            });
        });

	$('#CustomerTableContainer').jtable('load');
    };

    makeJTable();

});
