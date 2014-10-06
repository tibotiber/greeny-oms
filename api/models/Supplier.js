/**
 * Supplier.js
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
	    size: 2
	},
	
	company: {
	    model: 'company',
	    required: true
	}
	
    }
    
};
