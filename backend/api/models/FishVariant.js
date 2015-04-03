/**
 * FishVariant.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

// define possible sizes here, in order of display
var orderedSizes = ['FS','SS','S','SM','M','ML','L','XL','XXL','3XL','4XL','5XL','6XL','1.25in','1.5in','1.75in','2in','2.25in','2.5in','3in','3.5in','4in','4.5in','5in','6in','7in','8in','9in','10in','11in','12in','14in'];


module.exports = {

    migrate: 'safe',
    
    autoPK: false,

    attributes: {

	sku: {
	    type: 'string',
	    primaryKey: true,
	    required: true,
	    unique: true
	},

	product: {
	    model: 'FishProduct',
	    required: true
	},

	size: {
	    type: 'string',
	    required: true,
	    enum: orderedSizes
	},

	sizeInMillis: {
	    type: 'string'
	},

	sizeInInches: {
	    type: 'string'
	},

	gender: {
	    type: 'string',
	    enum: ['Male', 'Female', 'Pair']
	},

	grade: {
	    type: 'string',
	    enum: ['AA', 'A', 'AB', 'B']
	},

	density20h: {
	    type: 'integer'
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

	cachedSkuPicker: {
	    type: 'string'
	},
	
	getSortedSku: function() {
	    // extend Number with zero padding method
	    Number.prototype.pad = function(size) {
		var s = String(this);
		if(typeof(size) !== "number"){size = 2;}
		while (s.length < size) {s = "0" + s;}
		return s;
	    };
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

    },
    
    afterCreate: function(variant, cb) {
	// calculate sku picker cache
	FishVariant.cacheSkuPicker(variant, cb);
    },

    afterUpdate: function(variant, cb) {
	// calculate sku picker cache
	FishVariant.cacheSkuPicker(variant, cb);
    },

    cacheSkuPicker: function(variant, cb) {
	// compute cache for sku picker
	FishVariant.findOne(variant.sku).populateAll().exec(function(err, item) {
	    if(!err && item) {
		// manual n-2 population (until waterline handles it)
		FishFamily.findOne(item.product.family).exec(function(err, family) {
		    if(!err) {
			item.product.family = family;
			var cachedSkuPicker = '';
			cachedSkuPicker += item.getSortedSku();
			cachedSkuPicker += ' | ' + item.sku;
			cachedSkuPicker += ' | ' + item.getInvoiceName();
			cachedSkuPicker += ' | ' + item.product.scientificName;
			if(item.cachedSkuPicker !== cachedSkuPicker) {
			    item.product = item.product.code;
			    item.cachedSkuPicker = cachedSkuPicker;
			    item.save(cb);
			} else {
			    cb(null, item);
			}
		    } else {
			cb("Error finding family for "+item.sku+":\n"+err);
		    }
		});
	    } else if(!err) {
		cb("No variant found to cache sku picker.");
	    } else {
		cb(err);
	    }
	});
    }

};
