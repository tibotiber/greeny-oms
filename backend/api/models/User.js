/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

    tableName: 'user_waterlock',
    
    attributes: require('waterlock').models.user.attributes({

	name: {
	    type: 'string'
	},

	email: {
	    type: 'email'
	},

	profile_pic: {
	    type: 'string',
	    required: true,
	    defaultsTo: 'avatar.png'
	},

	admin: {
	    type: 'boolean',
	    defaultsTo: false
	},

	manager: {
	    type: 'boolean',
	    defaultsTo: false
	},

	sales: {
	    type: 'boolean',
	    defaultsTo: false
	},

	purchasing: {
	    type: 'boolean',
	    defaultsTo: false
	},

	quality_check: {
	    type: 'boolean',
	    defaultsTo: false
	},

	packing: {
	    type: 'boolean',
	    defaultsTo: false
	},

	documentation: {
	    type: 'boolean',
	    defaultsTo: false
	},

	accounts_payable: {
	    type: 'boolean',
	    defaultsTo: false
	},

	accounts_receivable: {
	    type: 'boolean',
	    defaultsTo: false
	}
	
    }),
    
    beforeCreate: require('waterlock').models.user.beforeCreate,
    beforeUpdate: require('waterlock').models.user.beforeUpdate,

    beforeValidate: function(values, next) {
	// boolify checkbox values
	var booleans = ['admin', 'manager', 'sales', 'purchasing', 'quality_check', 'packing', 'documentation', 'accounts_payable', 'accounts_receivable'];
	var boolify = function(property) {
	    if(typeof values[property+'_cb'] !== 'undefined') {
		if(values[property+'_cb'] === 'unchecked')
		    values[property] = false;
		else if(values[property+'_cb'][1] === 'on')
		    values[property] = true;
	    }
	};
	booleans.forEach(boolify);
	next();
    }

};
