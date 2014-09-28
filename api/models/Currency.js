/**
 * Currency.js
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
	    size: 3
	},

	name: {
	    type: 'string',
	    required: true,
	    unique: true
	},

	rate: {
	    type: 'float',
	    required: true
	}
	
    }
    
};

