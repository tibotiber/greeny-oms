$(document).ready(function() {
    // function to prepare JTable
    var makeJTable = function() {
        $('#PriceTableContainer').jtable({
            title: 'Pricelist search result',
            actions: {
                listAction: '/pricelist/search?_csrf=' + _csrf
            },
            fields: {
		sku: {
                    title: 'SKU',
                    width: '10%',
                    key: true,
                },
                name: {
                    title: 'Name',
                    width: '25%'
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
		thirdparty: {
		    title: 'Thirdparty',
		    width: '10%'
		},
		price: {
		    title: 'Price',
		    width: '8%'
		},
		currency: {
		    title: 'Currency',
		    width: '6%'
		},
		discount: {
		    title: '% disc.',
		    width: '6%'
		},
		buyingSize: {
		    title: 'Buy size',
		    width: '10%'
		}
            }
        });

        // re-load records when user click search button.
        $('#SearchButton').click(function(e) {
            e.preventDefault();
            $('#PriceTableContainer').jtable('load', {
                fish: $("[name='fish']").val().split(' ').join('+'),
		thirdparty: $("[name='thirdparty']").val(),
		currency: $("[name='currency']").val()
            });
        });
    };

    makeJTable();

});
