$(document).ready(function() {
    // function to prepare JTable
    var opennedChildTable;

    var makeJTable = function() {
        $('#SupplierTableContainer').jtable({
            title: 'List of suppliers',
	    //paging: true,
	    //pageSize: 50,
            openChildAsAccordion: true,
            listClass: 'child-opener-image-column',
            actions: {
                listAction  : '/supplier/list?_csrf=' + _csrfURL,
		createAction: '/supplier/create?_csrf=' + _csrfURL,
		updateAction: '/supplier/update?_csrf=' + _csrfURL,
		deleteAction: '/supplier/destroy?_csrf=' + _csrfURL
	    },
            fields: {
		prices: {
                    title: '',
                    width: '2%',
                    edit: false,
                    create: false,
                    display: function(suppliers) {
                        //Create an image that will be used to open child table
			var $img = $('<i class="child-opener-image fa fa-list" title="Show contacts" />');
                        //Open child table when user clicks the image
                        $img.click(function() {
			    if(!$('#SupplierTableContainer').jtable('isChildRowOpen', $img.closest('tr'))) {
				// JTable for prices
				$('#SupplierTableContainer').jtable('openChildTable', $img.closest('tr'), {
                                    title: suppliers.record.code + ' - Contacts',
                                    showCloseButton: false,
				    actions: {
					listAction    : '/contact/listByCompany?_csrf=' + _csrfURL+'&company='+suppliers.record.code,
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
                                            defaultValue: suppliers.record.code
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
				$('#SupplierTableContainer').jtable('closeChildTable', $img.closest('tr'), function(data) {
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
		SupplierFormValidator();
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
            $('#SupplierTableContainer').jtable('load', {
                search: $("[name='search']").val().split(' ').join('+')
            });
        });

	$('#SupplierTableContainer').jtable('load');
    };

    makeJTable();

});
