/**
 * Pricelist.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

// define possible sizes here, in order of display
var orderedSizes = ['FS','SS','S','SM','M','ML','L','XL','XXL','3XL','4XL','5XL','6XL','1.25in','1.5in','1.75in','2in','2.25in','2.5in','3in','3.5in','4in','4.5in','5in','6in','7in','8in','9in','10in','11in','12in', '14in'];


module.exports = {

    migrate: 'safe',
    
    attributes: {

	sku: {
	    model: 'FishVariant',
	    required: true
	},

	pricetier: {
	    model: 'Pricetier'
	},

	supplier: {
	    model: 'Supplier'
	},

	customer: {
	    model: 'Customer'
	},

	price: {
	    type: 'float',
	    required: true
	},

	currency: {
	    model: 'Currency',
	    required: true
	},

	discount: {
	    type: 'integer',
	    required: true
	},

	buyingSize: {
	    type: 'string',
	    enum: orderedSizes
	}

    },

    beforeValidate: function(values, next) {
	// discount defaults to 0
	if(isNaN(values.discount))
	    values.discount = 0;
	// thirdparty manipulation
	values[values.type.toLowerCase()] = values.thirdparty;
	next();
    }
    
};

