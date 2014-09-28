/**
 * Customer.js
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
	    model: 'Company',
	    required: true
	},

	transhipper: {
	    type: 'boolean',
	    defaultsTo: false
	},

	stockist: {
	    type: 'boolean',
	    defaultsTo: false
	},

	mixedCodes: {
	    type: 'boolean',
	    defaultsTo: false
	},

	boxSize: {
	    type: 'string',
	    enum: ['small', 'big'],
	    defaultsTo: 'big'
	}
	
    }
    
};
