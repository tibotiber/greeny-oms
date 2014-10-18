/**
 * FreightQuotation.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

	company: {
	    model: 'Company',
	    required: true
	},

	carrier: {
	    type: 'string',
	    required: true
	},

	agent: {
	    type: 'string',
	    required: true
	},

	rate: {
	    type: 'float',
	    required: true
	},

	summerRate: {
	    type: 'float',
	    required: false
	},

	currency: {
	    model: 'Currency',
	    required: true
	},

	weightBreak: {
	    type: 'json'
	},

	'default': {
	    type: 'boolean',
	    defaultsTo: false
	},
	
	notes: {
	    type: 'text'
	},

	routes: {
	    collection: 'FreightRoute',
	    via: 'quotation'
	}
	
    },

    beforeValidate: function(values, cb) {
	if(typeof(values.summerRate) === 'undefined')
	    delete values.summerRate;
	cb();
    }
    
};
