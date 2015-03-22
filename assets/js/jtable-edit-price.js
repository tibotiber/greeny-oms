$(document).ready(function() {
    // function to prepare JTable
    var opennedChildTable;

    var makeJTable = function() {
        $('#PriceTableContainer').jtable({
            title: 'Pricelist review and editing',
	    paging: true,
	    pageSize: 50,
            openChildAsAccordion: true,
            listClass: 'child-opener-image-column',
            actions: {
                listAction: '/pricelist/list'
	    },
            fields: {
		prices: {
                    title: '',
                    width: '2%',
                    edit: false,
                    create: false,
                    display: function(variants) {
                        //Create an image that will be used to open child table
			var $img = $('<i class="child-opener-image fa fa-list" title="Show all prices" />');
                        //Open child table when user clicks the image
                        $img.click(function() {
			    if(!$('#PriceTableContainer').jtable('isChildRowOpen', $img.closest('tr'))) {
				// JTable for prices
				$('#PriceTableContainer').jtable('openChildTable', $img.closest('tr'), {
                                    title: variants.record.sku + ' - All Prices',
                                    showCloseButton: false,
				    actions: {
					listAction    : '/pricelist/listByVariant?sku='+variants.record.sku,
					createAction  : '/pricelist/create',
					updateAction  : '/pricelist/update',
					deleteAction  : '/pricelist/destroy'
                                    },
                                    fields: {
                                        id: {
					    key: true,
					    list: false
					},
					sku: {
                                            type: 'hidden',
                                            defaultValue: variants.record.sku
                                        },
					thirdparty: {
					    title: 'Thirdparty',
					    width: '10%',
					    input: function(data) {
						return $('<input>').attr({
						    type: 'text',
						    name: 'thirdparty',
						    value: data.value
						}).addClass('form-control').autocomplete({
						    minLength: 2,
						    source: function(req, res) {
							async.parallel({
							    customers: function(cb) {
								io.socket.get('/customer/picker', {
								    search: req.term,
								    _csrf: _csrfURL
								}, function(data, jwres) {
								    data.forEach(function(item) {
									item.type = 'Customer';
								    });
								    cb(null, data);
								});
							    },
							    suppliers: function(cb) {
								io.socket.get('/supplier/picker', {
								    search: req.term,
								    _csrf: _csrfURL
								}, function(data, jwres) {
								    data.forEach(function(item) {
									item.type = 'Supplier';
								    });
								    cb(null, data);
								});
							    },
							    pricetiers: function(cb) {
								io.socket.get('/pricetier/picker', {
								    search: req.term,
								    _csrf: _csrfURL
								}, function(data, jwres) {
								    data.forEach(function(item) {
									item.type = 'Pricetier';
								    });
								    cb(null, data);
								});
							    }
							}, function (err, results) {
							    res(results.customers.concat(results.suppliers, results.pricetiers));
							});
						    },
						    select: function(event, ui) {
							$("input[name=thirdparty]").val(ui.item.value);
							$("input[name=type]").val(ui.item.type);
							if(ui.item.type === 'Pricetier') {
							    io.socket.get('/pricetier/'+ui.item.value, function(data, jwres) {
								if(data && data.preferredCurrency) {
								    $("select[name=currency]").val(data.preferredCurrency.code);
								    $('.jtable-dialog-form').bootstrapValidator('revalidateField', 'currency');
								}
							    });
							} else {
							    io.socket.get('/company/'+ui.item.value, function(data, jwres) {
								if(data && data.preferredCurrency) {
								    $("select[name=currency]").val(data.preferredCurrency.code);
								    $('.jtable-dialog-form').bootstrapValidator('revalidateField', 'currency');
								}
							    });
							}
							$('.jtable-dialog-form').bootstrapValidator('revalidateField', 'thirdparty');
							$('.jtable-dialog-form').bootstrapValidator('revalidateField', 'type');
						    }
						});
					    }
					},
					type: {
					    title:'Type',
					    width: '10%',
					    input: function(data) {
						return '<input class="form-control" type="text" name="type" readonly>';
					    }
					},
					thirdpartyCode: {
					    title: 'Code',
					    width: '5%',
					    create: false,
					    edit: false
					},
					price: {
					    title: 'Price',
					    width: '8%'
					},
					currency: {
					    title: 'Currency',
					    width: '6%',
					    options: '/currency/picker?format=jtable&_csrf='+_csrfURL
					},
					discount: {
					    title: '% disc.',
					    width: '6%'
					},
					buyingSize: {
					    title: 'Buy size',
					    width: '10%',
					    options: ['', 'FS','SS','S','SM','M','ML','L','XL','XXL','3XL','4XL','5XL','6XL','1.25in','1.5in','1.75in','2in','2.25in','2.5in','3in','3.5in','4in','4.5in','5in','6in','7in','8in','9in','10in','11in','12in','14in']
					}
				    },
				    formCreated: function(event, data) {
					$('.jtable-input-field-container').each(function() {
					    $(this).addClass('form-group');
					});
					$('.jtable-input').each(function() {
					    $(this).find('*').addClass('form-control');
					});
					if(data.record) {
					    $("input[name=type]").val(data.record.type);
					    $("input[name=thirdparty]").val(data.record.thirdpartyCode);
					}
					FishPriceFormValidator();
				    },
				    formSubmitting: function(event, data) {
					$('.jtable-dialog-form').data('bootstrapValidator').validate();
					return $('.jtable-dialog-form').data('bootstrapValidator').isValid();
				    },
				    formClosed: function(event, data) {
					$('.jtable-dialog-form').data('bootstrapValidator').destroy();
				    },
				    recordAdded: function(event, data) {
					opennedChildTable.jtable('reload');
				    },
				    recordUpdated: function(event, data) {
					opennedChildTable.jtable('reload');
				    }
                                }, function(data) {
				    opennedChildTable = data.childTable;
				    opennedChildTable.jtable('load');
                                });
			    } else {
				$('#PriceTableContainer').jtable('closeChildTable', $img.closest('tr'), function(data) {
				    opennedChildTable = null;
				});
			    }
                        });
                        return $img;
                    }
                },

		sku: {
                    title: 'SKU',
                    width: '10%',
                    key: true,
                },
                name: {
                    title: 'Name',
                    width: '30%'
                },
		density20h: {
		    title: '20h',
		    width: '5%'
		},
		density24h: {
		    title: '24h',
		    width: '5%'
		},
		density30h: {
		    title: '30h',
		    width: '5%'
		},
		density36h: {
		    title: '36h',
		    width: '5%'
		},
		density42h: {
		    title: '42h',
		    width: '5%'
		},
		wholesale: {
		    title: 'WLS (SGD)',
		    width: '10%'
		},
		wholesaleUSD: {
		    title: 'WLS (USD)',
		    width: '10%'
		},
		retail: {
		    title: 'RTL (SGD)',
		    width: '10%'
		}
	    }
        });

        // re-load records when user click search button.
        $('#SearchButton').click(function(e) {
            e.preventDefault();
            $('#PriceTableContainer').jtable('load', {
                fish: $("[name='fish']").val().split(' ').join('+')
            });
        });
    };

    makeJTable();

});
