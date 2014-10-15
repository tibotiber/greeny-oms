$(document).ready(function() {
    // function to prepare JTable
    var opennedChildTable;

    var makeJTable = function() {
        $('#FreightTableContainer').jtable({
            title: 'List of freight quotations',
	    //paging: true,
	    //pageSize: 50,
	    sorting: true,
	    multiSorting: true,
            openChildAsAccordion: true,
            listClass: 'child-opener-image-column',
            actions: {
                listAction  : '/freightQuotation/list?_csrf=' + _csrfURL,
		createAction: '/freightQuotation/create?_csrf=' + _csrfURL,
		updateAction: '/freightQuotation/update?_csrf=' + _csrfURL,
		deleteAction: '/freightQuotation/destroy?_csrf=' + _csrfURL
	    },
            fields: {
		prices: {
                    title: '',
                    width: '2%',
                    edit: false,
                    create: false,
                    display: function(freightQuotations) {
                        //Create an image that will be used to open child table
			var $img = $('<i class="child-opener-image fa fa-list" title="Show routes" />');
                        //Open child table when user clicks the image
                        $img.click(function() {
			    if(!$('#FreightTableContainer').jtable('isChildRowOpen', $img.closest('tr'))) {
				// JTable for prices
				$('#FreightTableContainer').jtable('openChildTable', $img.closest('tr'), {
                                    title: freightQuotations.record.code + ' - Routes',
                                    showCloseButton: false,
				    actions: {
					listAction    : '/freightRoute/listByCompany?_csrf=' + _csrfURL+'&company='+freightQuotations.record.code,
					createAction  : '/freightRoute/create?_csrf=' + _csrfURL,
					updateAction  : '/freightRoute/update?_csrf=' + _csrfURL,
					deleteAction  : '/freightRoute/destroy?_csrf=' + _csrfURL
                                    },
                                    fields: {
					id: {
					    key: true,
					    list: false
					},
                                        company: {
                                            type: 'hidden',
                                            defaultValue: freightQuotations.record.code
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
					FreightRouteFormValidator();
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
				$('#FreightTableContainer').jtable('closeChildTable', $img.closest('tr'), function(data) {
				    opennedChildTable = null;
				});
			    }
                        });
                        return $img;
                    }
                },

		id: {
                    key: true,
		    list: false
                },
                company: {
                    title: 'Customer/Supplier',
                    width: '20%',
		    input: function(data) {
			return $('<input>').attr({
			    type: 'text',
			    name: 'company',
			    value: data.value
			}).addClass('form-control').autocomplete({
			    minLength: 2,
			    source: function(req, res) {
				io.socket.get('/company/picker', {
				    search: req.term,
				    _csrf: _csrfURL				    
				}, function (data, jwres){
				    res(data);
				});
			    },
			    select: function(event, ui) {
				$("input [name=company]").val(ui.item.value);
				$('.jtable-dialog-form').bootstrapValidator('revalidateField', 'company');
			    }
			});
		    }
                },
		carrier: {
		    title: 'Carrier',
		    width: '15%'
		},
		agent: {
		    title: 'Freight Agent',
		    width: '15%'
		},
		rate: {
		    title: 'Rate',
		    width: '10%'
		},
		summerRate: {
		    title: 'Summer Rate',
		    width: '10%'
		},
		weightBreak: {
		    title: 'Weight Break Rates',
		    width: '20%',
		    input: function(data) {
			var wrapperClass = 'weightBreakWrapper';
			var addButton = $('<button/>', {
			    text: 'Add weight break rate',
			    click: function(e) {
				e.preventDefault();
				var removeButton = $('<a href="#"><i class="fa fa-trash-o inline-trash"></i></a>').click(function(e) {
				    e.preventDefault();
				    $(this).parent('div').remove();
				});
				var wbweight = $('<input type="text" class="inline-form-control form-control" name="wbweight[]" placeholder="min weight (ex: 300)"/>');
				var wbrate = $('<input type="text" class="inline-form-control form-control" name="wbrate[]" placeholder="rate (ex: 3.02)"/>');
				$('<div>').addClass('wb').append(wbweight).append(wbrate).append(removeButton).appendTo('.'+wrapperClass);
				//$('.jtable-dialog-form').bootstrapValidator('addField', wbweight);
				//$('.jtable-dialog-form').bootstrapValidator('addField', wbrate);

				//TODO: to get the validation to work on dynamically added field,
				// there must be an existing/hidden similar field
				// see http://bootstrapvalidator.com/examples/adding-dynamic-field/
				// so must reorganise all this!
				// go bye row and bootstrap columns with each a form-group also!
				//END OF TODO.

				//TODO: move this to form submission
				var wb = {};
				$('.wb').each(function() {
				    var weight = $(this).find('input[name="wbweight[]"]').val();
				    if(weight !==  '')
					wb[weight] = $(this).find('input[name="wbrate[]"]').val();
				});
				$('input[name="weightBreak"]').val(JSON.stringify(wb));
			    }
			});
			var wrapper = $('<div>').addClass(wrapperClass).append(
			    '<input type="hidden" name="weightBreak" value="{}"/>'
			).append(addButton);			
			return wrapper;
		    }
		},
		currency: {
		    title: 'Currency',
		    width: '10%',
		    options: '/currency/picker?format=jtable&_csrf='+_csrfURL
		},
		'default': {
		    title: 'Default freight choice?',
		    type: 'checkbox',
		    values: {'0': 'No', '1': 'Yes'},
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
		    $(this).find('*:not(div)').addClass('form-control');
		    $(this).find('div').each(function() {
			$(this).find('*').addClass('form-control');
		    });
		});
		FreightQuotationFormValidator();
	    },
	    formSubmitting: function(event, data) {
		$('.jtable-dialog-form').data('bootstrapValidator').validate();
		return $('.jtable-dialog-form').data('bootstrapValidator').isValid();
	    },
	    formClosed: function(event, data) {
		$('.jtable-dialog-form').data('bootstrapValidator').destroy();
	    }
        });

	$('#FreightTableContainer').jtable('load');
    };

    makeJTable();

});
