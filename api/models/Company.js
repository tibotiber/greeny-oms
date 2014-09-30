/**
 * Company.js
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

	name: {
	    type: 'string',
	    required: true
	},

	type: {
	    type: 'string',
	    required: true,
	    enum: ['customer', 'supplier']
	},

	contacts: {
	    collection: 'contact',
	    via: 'company'
	},

	address: {
	    type: 'text'
	},

	country: {
	    type: 'string'
	},

	email: {
	    type: 'string',
	    email: true
	},

	phone: {
	    type: 'string'
	},

	fax: {
	    type: 'string'
	},

	website: {
	    type: 'string',
	    url: true
	},

	firstShipment: {
	    type: 'date'
	}
		    
    },

    beforeValidate: function(values, cb) {
	if(values.firstShipment === "")
	    delete values.firstShipment;
	cb();
    }
    
};
