$(document).ready(function() {
    // function to prepare JTable
    var opennedChildTable;

    var makeJTable = function() {
        $('#FishTableContainer').jtable({
            title: 'List of fish products (expand rows for variants)',
            paging: true,
            pageSize: 50,
            openChildAsAccordion: true,
            listClass: 'child-opener-image-column',
            actions: {
                listAction	: '/fishproduct/listFiltered',
                createAction	: '/fishproduct/create',
                updateAction	: '/fishproduct/update',
                deleteAction	: '/fishproduct/destroy'
            },
            fields: {
		variants: {
                    title: '',
                    width: '2%',
                    edit: false,
                    create: false,
                    display: function(products) {
                        //Create an image that will be used to open child table
			var $img = $('<i class="child-opener-image fa fa-list" title="Show variants" />');
                        //Open child table when user clicks the image
                        $img.click(function() {
			    if(!$('#FishTableContainer').jtable('isChildRowOpen', $img.closest('tr'))) {
				// JTable for variants
				$('#FishTableContainer').jtable('openChildTable', $img.closest('tr'), {
                                    title: products.record.code + ' - Variants',
				    showCloseButton: false,
                                    actions: {
                                        listAction	: '/fishvariant/listByProduct?code='+products.record.code,
                                        createAction	: '/fishvariant/create',
                                        updateAction	: '/fishvariant/update',
                                        deleteAction	: '/fishvariant/destroy'
                                    },
                                    fields: {
                                        product: {
                                            type: 'hidden',
                                            defaultValue: products.record.code
                                        },
                                        sku: {
                                            title: 'SKU',
                                            width: '10%',
                                            key: true,
                                            create: false,
                                            edit: false
                                        },
                                        invoicename: {
                                            title: 'Name',
                                            width: '25%',
                                            create: false,
                                            edit: false
                                        },
                                        size: {
                                            title: 'Size',
                                            width: '5%',
					    options: ['FS','SS','S','SM','M','ML','L','XL','XXL','3XL','4XL','5XL','6XL','1.25in','1.5in','1.75in','2in','2.25in','2.5in','3in','3.5in','4in','4.5in','5in','6in','7in','8in','9in','10in','11in','12in','14in']
                                        },
                                        sizeInMillis: {
                                            title: 'mm',
                                            width: '5%'
                                        },
                                        sizeInInches: {
                                            title: 'inch',
                                            width: '5%',
                                        },
                                        gender: {
                                            title: 'Gender',
                                            width: '10%',
                                            options: ["", "Male", "Female", "Pair"]
                                        },
                                        grade: {
                                            title: 'Grade',
                                            width: '5%',
					    options: ['', 'AA', 'A', 'AB', 'B']
                                        },
					density20h: {
					    title: '20h',
					    width: '4%',
					    defaultValue: '0'
					},
					density24h: {
					    title: '24h',
					    width: '4%',
					    defaultValue: '0'
					},
					density30h: {
					    title: '30h',
					    width: '4%',
					    defaultValue: '0'
					},
					density36h: {
					    title: '36h',
					    width: '4%',
					    defaultValue: '0'
					},
					density42h: {
					    title: '42h',
					    width: '4%',
					    defaultValue: '0'
					},
					individuallyPacked: {
					    title: 'indiv.',
					    width: '3%',
					    type: 'checkbox',
					    values: { 'false': 'No', 'true': 'Yes' }
					},
					needMoreOxygen: {
					    title: 'O2+',
					    width: '3%',
					    type: 'checkbox',
					    values: { 'false': 'No', 'true': 'Yes' }
					},
					needLessOxygen: {
					    title: 'O2-',
					    width: '3%',
					    type: 'checkbox',
					    values: { 'false': 'No', 'true': 'Yes' }
					},
					needHighDryness: {
					    title: 'Ca+',
					    width: '3%',
					    type: 'checkbox',
					    values: { 'false': 'No', 'true': 'Yes' }
					},
					packedAt23Degrees: {
					    title: '23C',
					    width: '3%',
					    type: 'checkbox',
					    values: { 'false': 'No', 'true': 'Yes' }
					},
					needKetapangLeaf: {
					    title: 'Leaf',
					    width: '3%',
					    type: 'checkbox',
					    values: { 'false': 'No', 'true': 'Yes' }
					}
                                    },
				    formCreated: function(event, data) {
					$('.jtable-input-field-container').each(function() {
					    $(this).addClass('form-group');
					});
					$('.jtable-input').each(function() {
					    $(this).find('*').addClass('form-control');
					});
					FishVariantFormValidator();
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
				$('#FishTableContainer').jtable('closeChildTable', $img.closest('tr'), function(data) {
				    opennedChildTable = null;
				});
			    }
                        });
                        return $img;
                    }
                },

                code: {
                    key: true,
                    title: 'Code',
                    width: '10%'
                },
                family: {
                    title: 'Family',
                    width: '10%',
		    options: '/fishfamily/listnames?_csrf='+_csrfURL
                },
                name: {
                    title: 'Name',
                    width: '25%'
                },
                scientificName: {
                    title: 'Scientific name',
                    width: '33%'
                },
                chineseName: {
                    title: 'Chinese name',
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
		FishProductFormValidator();
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
            $('#FishTableContainer').jtable('load', {
                search: $("[name='search']").val().split(' ').join('+')
            });
        });

        // load all records when page is first shown
        $('#SearchButton').click();
    };

    makeJTable();

});
