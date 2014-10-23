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
                listAction  : '/freightQuotation/list',
		createAction: '/freightQuotation/create',
		updateAction: '/freightQuotation/update',
		deleteAction: '/freightQuotation/destroy'
	    },
            fields: {
		routes: {
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
                                    title: freightQuotations.record.company + ' by ' + freightQuotations.record.carrier + ' - Routes',
                                    showCloseButton: false,
				    actions: {
					listAction    : '/freightRoute/listByQuotation?quotation='+freightQuotations.record.id,
					createAction  : '/freightRoute/create',
					updateAction  : '/freightRoute/update',
					deleteAction  : '/freightRoute/destroy'
                                    },
                                    fields: {
					id: {
					    key: true,
					    list: false
					},
                                        quotation: {
                                            type: 'hidden',
                                            defaultValue: freightQuotations.record.id
                                        },
					description: {
					    title: 'Description',
					    width: '50%'
					},
					segments: {
					    title:'Route segments',
					    list: false,
					    input: function(data) {
						var wrapperClass = 'segmentsWrapper';
						var cloneTemplate = function(add, template, flight, dA, dT, aA, aT) {
						    template = template || $('#segTemplate');
						    var clone = template.clone().removeClass('hide').removeAttr('id').addClass('seg');
						    // add value if already set
						    if(flight) {
							clone.find('input[name="flight[]"]').val(flight);
							clone.find('input[name="dA[]"]').val(dA);
							clone.find('input[name="dT[]"]').val(dT);
							clone.find('input[name="aA[]"]').val(aA);
							clone.find('input[name="aT[]"]').val(aT);
						    }
						    if(add) {
							// add button on first row
							clone.find('#add-remove').append('<i class="fa fa-plus-square-o"></i>').click(function(e) {
							    e.preventDefault();
							    cloneTemplate(false);
							});
						    } else {
							// remove button on other row
							clone.find('#add-remove').append('<i class="fa fa-trash-o"></i>').click(function(e) {
							    e.preventDefault();
							    var row = $(this).parents('.seg');
							    // remove validator's field
							    $('.jtable-dialog-form').bootstrapValidator('removeField', row.find('[name="flight[]"]'));
							    $('.jtable-dialog-form').bootstrapValidator('removeField', row.find('[name="dA[]"]'));
							    $('.jtable-dialog-form').bootstrapValidator('removeField', row.find('[name="dT[]"]'));
							    $('.jtable-dialog-form').bootstrapValidator('removeField', row.find('[name="aA[]"]'));
							    $('.jtable-dialog-form').bootstrapValidator('removeField', row.find('[name="aT[]"]'));
							    // Remove element containing the option
							    row.remove();
							});
						    }
						    // autocomplete airport field
						    clone.find('input[name="dA[]"], input[name="aA[]"]').autocomplete({
							minLength: 0,
							source: airports,
							select: function(event, ui) {
							    $(event.target).val(ui.item.value);
							    $('.jtable-dialog-form').bootstrapValidator('revalidateField', $(event.target));
							}
						    });
						    // timepicker
						    clone.find('input[name="dT[]"], input[name="aT[]"]').timepicker({
							timeFormat: "HHmm",
							onSelect: function(text, instance) {
							    $('.jtable-dialog-form').bootstrapValidator('revalidateField', $(instance.$input[0]));
							}
						    });
						    clone.insertBefore(template);
						    $('.jtable-dialog-form').bootstrapValidator('addField', clone.find('[name="flight[]"]'));
						    $('.jtable-dialog-form').bootstrapValidator('addField', clone.find('[name="dA[]"]'));
						    $('.jtable-dialog-form').bootstrapValidator('addField', clone.find('[name="dT[]"]'));
						    $('.jtable-dialog-form').bootstrapValidator('addField', clone.find('[name="aA[]"]'));
						    $('.jtable-dialog-form').bootstrapValidator('addField', clone.find('[name="aT[]"]'));
						    // remove form-group shared by all wb fields
						    var container = template.parents('.jtable-input-field-container');
						    container.removeClass('form-group');
						};
						var template = $('<div class="form-group hide" id="segTemplate" >' +
								 '<div class="row">' +
								 '<div class="col-sm-11">' +
								 '<input class="form-control" type="text" name="flight[]" placeholder="flight number" />' +
								 '</div>' +
								 '<div class="col-sm-1">' +
								 '<a href="#" id="add-remove"></a>' +
								 '</div>' +
								 '</div>' +
								 '<div class="row">' +
								 '<div class="col-sm-6">' +
								 '<input class="form-control" type="text" name="dA[]" placeholder="airport of departure" />' +
								 '</div>' +
								 '<div class="col-sm-5">' +
								 '<input class="form-control" type="text" name="dT[]" placeholder="time of departure" />' +
								 '</div>' +
								 '</div>' +
								 '<div class="row">' +
								 '<div class="col-sm-6">' +
								 '<input class="form-control" type="text" name="aA[]" placeholder="airport of arrival" />' +
								 '</div>' +
								 '<div class="col-sm-5">' +
								 '<input class="form-control" type="text" name="aT[]" placeholder="time of arrival" />' +
								 '</div>' +
								 '</div>' +
								 '</div>');
						var wrapper = $('<div>').addClass(wrapperClass).append(
						    '<input type="hidden" name="segments" value="[]" />'
						).append(template);
						if(data.formType === 'create') {
						    cloneTemplate(true, template);
						} else {
						    var firstRow = true;
						    _.each(JSON.parse('['+data.value+']'), function(item) {
							cloneTemplate(firstRow, template, item.flight, item.dA, item.dT, item.aA, item.aT);
							firstRow = false;
						    });
						}
						return wrapper;
					    }
					},
					door_to_door: {
					    title: 'Door to door duration in hours',
					    width: '25%'
					},
					logInPeriod: {
					    title: 'Log in period in hours',
					    width: '25%',
					    defaultValue: 5
					},
					'default': {
					    title: 'Default freight choice?',
					    type: 'checkbox',
					    values: {false: 'No', true: 'Yes'},
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
					    $(this).find('input,select,textarea,button').addClass('form-control');
					});
					FreightRouteFormValidator();
				    },
				    formSubmitting: function(event, data) {
					// combine segments in array (done client-side to ensure index mapped between arrays)
					var seg = [];
					$('.seg').each(function() {
					    var flight = $(this).find('input[name="flight[]"]').val();
					    if(flight !==  '') {
						seg.push(JSON.stringify({
						    flight: flight,
						    dA: $(this).find('input[name="dA[]"]').val(),
						    dT: $(this).find('input[name="dT[]"]').val(),
						    aA: $(this).find('input[name="aA[]"]').val(),
						    aT: $(this).find('input[name="aT[]"]').val()
						}));
					    }
					});
					$('input[name="segments"]').val(seg);
					// validate and submit
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
			var cloneTemplate = function(template, weight, rate) {
			    template = template || $('#wbTemplate');
			    var clone = template.clone().removeClass('hide').removeAttr('id').addClass('wb');
			    if(weight) clone.find('input[name="wbweight[]"]').val(weight);
			    if(rate) clone.find('input[name="wbrate[]"]').val(rate);
			    clone.find('#remove').click(function(e) {
				e.preventDefault();
				var row = $(this).parents('.wb');
				// remove validator's field
				$('.jtable-dialog-form').bootstrapValidator('removeField', row.find('[name="wbweight[]"]'));
				$('.jtable-dialog-form').bootstrapValidator('removeField', row.find('[name="wbrate[]"]'));
				// Remove element containing the option
				row.remove();
			    });
			    clone.insertBefore(template);
			    $('.jtable-dialog-form').bootstrapValidator('addField', clone.find('[name="wbweight[]"]'));
			    $('.jtable-dialog-form').bootstrapValidator('addField', clone.find('[name="wbrate[]"]'));
			    // remove form-group shared by all wb fields
			    var container = template.parents('.jtable-input-field-container');
			    container.removeClass('form-group');
			};
			var addButton = $('<button/>', {
			    text: 'Add weight break rate',
			    click: function(e) {
				e.preventDefault();
				cloneTemplate();
			    }
			});
			addButton.css('margin-bottom', '15px');
			var template = $('<div class="form-group hide" id="wbTemplate">' +
					 '<div class="row">' +
					 '<div class="col-sm-6">' +
					 '<input class="form-control" type="text" name="wbweight[]" placeholder="starting weight" />' +
					 '</div>' +
					 '<div class="col-sm-5">' +
					 '<input class="form-control" type="text" name="wbrate[]" placeholder="rate" />' +
					 '</div>' +
					 '<div class="col-sm-1">' +
					 '<a href="#" id="remove"><i class="fa fa-trash-o"></i></a>' +
					 '</div>' +
					 '</div>' +
					 '</div>');
			var wrapper = $('<div>').addClass(wrapperClass).append(
			    '<input type="hidden" name="weightBreak" value="{}"/>'
			).append(addButton).append(template);
			if(data.formType === 'edit') {
			    if(typeof(data.value) === 'string')
				data.value = JSON.parse(data.value);
			    _.each(data.value, function(value, key) {
				cloneTemplate(template, key, value);
			    });
			}
			return wrapper;
		    },
		    list: false
		},
		currency: {
		    title: 'Currency',
		    width: '10%',
		    options: '/currency/picker?format=jtable&_csrf='+_csrfURL
		},
		'default': {
		    title: 'Default freight choice?',
		    type: 'checkbox',
		    values: {false: 'No', true: 'Yes'},
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
		    $(this).find('input,select,textarea,button').addClass('form-control');
		});
		FreightQuotationFormValidator();
	    },
	    formSubmitting: function(event, data) {
		// combine weight break rates in json (done client-side to ensure index mapped between arrays)
		var wb = {};
		$('.wb').each(function() {
		    var weight = $(this).find('input[name="wbweight[]"]').val();
		    if(weight !==  '')
			wb[weight] = $(this).find('input[name="wbrate[]"]').val();
		});
		$('input[name="weightBreak"]').val(JSON.stringify(wb));
		// validate and submit
		$('.jtable-dialog-form').data('bootstrapValidator').validate();
		return $('.jtable-dialog-form').data('bootstrapValidator').isValid();
	    },
	    formClosed: function(event, data) {
		$('.jtable-dialog-form').data('bootstrapValidator').destroy();
	    }
        });

	$('#FreightTableContainer').jtable('load');
    };

    // preload airports list
    var airports = [];
    io.socket.get('/airport/picker', {_csrf: _csrfURL}, function (data, jwres) {
	airports = data;
    });

    // make table
    makeJTable();

});
