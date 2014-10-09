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
                listAction: '/pricelist/list?_csrf=' + _csrfURL
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
					listAction    : '/pricelist/listByVariant?_csrf=' + _csrfURL+'&sku='+variants.record.sku,
					createAction  : '/pricelist/create?_csrf=' + _csrfURL,
					updateAction  : '/pricelist/update?_csrf=' + _csrfURL,
					deleteAction  : '/pricelist/destroy?_csrf=' + _csrfURL
                                    },
                                    fields: {
                                        sku: {
                                            type: 'hidden',
                                            defaultValue: variants.record.sku
                                        },
					type: {
					    title:'Type',
					    options: ['Pricetier', 'Customer', 'Supplier'],
					    width: '10%'
					},
					thirdparty: {
					    title: 'Thirdparty',
					    //TODO: options dep. on type field
					    //TODO: automatic code based on this
					    // or better single field with value-display pairs
					    width: '10%'
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
					FishPriceFormValidator();
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
