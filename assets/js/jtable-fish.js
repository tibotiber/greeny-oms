$(document).ready(function() {
    // function to prepare JTable
    var makeJTable = function(_csrf) {
        $('#FishTableContainer').jtable({
            title: 'List of fish products (expand rows for variants)',
            paging: true,
            pageSize: 50,
            openChildAsAccordion: true,
            listClass: 'child-opener-image-column',
            actions: {
                listAction: '/fishproduct/listFiltered?_csrf=' + _csrf,
                createAction: '/fishproduct/create?_csrf=' + _csrf,
                updateAction: '/fishproduct/update?_csrf=' + _csrf,
                deleteAction: '/fishproduct/destroy?_csrf=' + _csrf
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
                            $('#FishTableContainer').jtable('openChildTable',
                                $img.closest('tr'), //Parent row
                                {
                                    title: products.record.getCommonName() + ' - Variants',
                                    actions: {
                                        listAction: '/fishvariant/listByProduct?_csrf='+_csrf+'&id='+products.record.id,
                                        createAction: '/fishvariant/create?_csrf=' + _csrf,
                                        updateAction: '/fishvariant/update?_csrf=' + _csrf,
                                        deleteAction: '/fishvariant/destroy?_csrf=' + _csrf
                                    },
                                    fields: {
                                        code: {
                                            type: 'hidden',
                                            defaultValue: products.record.code,
                                            inputClass: 'validate[required]'
                                        },
                                        sku: {
                                            title: 'SKU',
                                            width: '10%',
                                            key: true,
                                            create: false,
                                            edit: false
                                        },
                                        skuname: {
                                            title: 'Name',
                                            width: '40%',
                                            create: false,
                                            edit: false
                                        },
                                        size: {
                                            title: 'Size',
                                            width: '10%',
                                            inputClass: 'validate[required]'
                                        },
                                        size_mm: {
                                            title: 'Size (mm)',
                                            width: '10%'
                                        },
                                        size_inch: {
                                            title: 'Size (inch)',
                                            width: '10%',
                                        },
                                        gender: {
                                            title: 'Gender',
                                            width: '10%',
                                            options: ["", "Male", "Female", "Pair"]
                                        },
                                        grade: {
                                            title: 'Grade',
                                            width: '10%'
                                        }
                                    },
                                    formCreated: function(event, data) {
                                        data.form.validationEngine();
                                    },
                                    formSubmitting: function(event, data) {
                                        return data.form.validationEngine('validate');
                                    },
                                    formClosed: function(event, data) {
                                        data.form.validationEngine('hide');
                                        data.form.validationEngine('detach');
                                    }
                                }, function(data) {
                                    data.childTable.jtable('load');
                                });
                        });
                        return $img;
                    }
                },
                code: {
                    key: true,
                    title: 'Code',
                    width: '10%',
                    inputClass: 'validate[required]'
                },
                family: {
                    title: 'Family',
                    width: '10%',
                    inputClass: 'validate[required]'
                },
                name: {
                    title: 'Name',
                    width: '38%',
                    inputClass: 'validate[required]'
                },
                scientificName: {
                    title: 'Scientific name',
                    width: '20%'
                },
                chineseName: {
                    title: 'Chinese name',
                    width: '20%'
                }
            },
            formCreated: function(event, data) {
                data.form.validationEngine();
            },
            formSubmitting: function(event, data) {
                return data.form.validationEngine('validate');
            },
            formClosed: function(event, data) {
                data.form.validationEngine('hide');
                data.form.validationEngine('detach');
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

    // get csrf token before making the JTable
    io.socket.get('/csrfToken', function(res) {
        makeJTable(res._csrf);
    });
});
