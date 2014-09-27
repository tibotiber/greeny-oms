/**
 * FishProduct.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

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

    }

};

