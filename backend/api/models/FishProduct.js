/**
 * FishProduct.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    migrate: 'safe',
    
    autoPK: false,
    
    attributes: {

	code: {
	    type: 'string',
	    primaryKey: true,
	    required: true,
	    unique: true,
	    size: 5
	},

	family: {
	    model: 'FishFamily',
	    required: true
	},

	name: {
	    type: 'string',
	    required: true
	},

	scientificName: {
	    type: 'string'
	},

	chineseName: {
	    type: 'string'
	},

	cachedSkuPicker: {
	    type: 'string'
	},

	getCommonName: function() {
	    return this.family.name + ' ' + this.name;
	}

    },

    afterCreate: function(product, cb) {
	// calculate sku picker cache
	FishProduct.cacheSkuPicker(product, cb);
    },

    afterUpdate: function(product, cb) {
	// calculate sku picker cache
	FishProduct.cacheSkuPicker(product, cb);
    },

    cacheSkuPicker: function(product, cb) {
	// compute cache for sku picker
	FishProduct.findOne(product.code).populateAll().exec(function(err, item) {
	    if(!err && item) {
		var cachedSkuPicker = '';
		cachedSkuPicker += item.code;
		cachedSkuPicker += ' | ' + item.getCommonName();
		cachedSkuPicker += ' | ' + item.scientificName;
		if(item.cachedSkuPicker !== cachedSkuPicker) {
		    item.cachedSkuPicker = cachedSkuPicker;
		    item.save(cb);
		} else {
		    cb(null, item);
		}
	    } else if(!err) {
		cb("No product found to cache sku picker.");
	    } else {
		cb(err);
	    }
	});
    }

};

