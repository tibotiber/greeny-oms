/**
 * FishVariant.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

// define possible sizes here, in order of display
var orderedSizes = ['FS','SS','S','SM','M','ML','L','XL','XXL','3XL','4XL','5XL','1.25in','1.5in','1.75in','2in','2.25in','2.5in','3in','3.5in','4in','4.5in','5in','6in','7in','8in','9in','10in','11in','12in'];


module.exports = {

    attributes: {

	sku: {
	    type: 'string',
	    required: true,
	    unique: true
	},

	product: {
	    model: 'FishProduct',
	    required: true
	},

	size: {
	    type: 'string',
	    enum: orderedSizes
	},

	sizeInMillis: {
	    type: 'float'
	},

	sizeInInches: {
	    type: 'float'
	},

	gender: {
	    type: 'string',
	    enum: ['Male', 'Female', 'Pair']
	},

	grade: {
	    type: 'string',
	    enum: ['A', 'AB', 'B']
	},

	density24h: {
	    type: 'integer'
	},
	
	density30h: {
	    type: 'integer'
	},
	
	density36h: {
	    type: 'integer'
	},
	
	density42h: {
	    type: 'integer'
	},

	individuallyPacked: {
	    type: 'boolean',
	    required: true,
	    defaultsTo: false
	},
	
	needMoreOxygen: {
	    type: 'boolean',
	    required: true,
	    defaultsTo: false
	},
	
	needLessOxygen: {
	    type: 'boolean',
	    required: true,
	    defaultsTo: false
	},
	
	needHighDryness: {
	    type: 'boolean',
	    required: true,
	    defaultsTo: false
	},
	
	packedAt23Degrees: {
	    type: 'boolean',
	    required: true,
	    defaultsTo: false
	},
	
	needKetapangLeaf: {
	    type: 'boolean',
	    required: true,
	    defaultsTo: false
	},
	
	getSortedSku: function() {
	    // extend Number with zero padding method
	    Number.prototype.pad = function(size) {
		var s = String(this);
		if(typeof(size) !== "number"){size = 2;}
		while (s.length < size) {s = "0" + s;}
		return s;
	    }
	    // replace size by ordered index in sku
	    var index = orderedSizes.indexOf(this.size).pad(2);
	    return this.sku.replace('/'+this.size, '/_'+index);
	},

	getInvoiceName: function() {
	    var iN = this.product.getCommonName();
	    if(this.gender) iN += " "+this.gender;
	    if(this.grade) iN += " '"+this.grade+"'";
	    if(this.size) iN += " - size "+this.size;
	    return iN;
	},

	getInvoiceNameWithChinese: function() {
	    var iNWC = this.getInvoiceName();
	    if(this.product.chineseName) iNWC += " ("+this.product.chineseName+")";
	    return iNWC;
	}

    }

};