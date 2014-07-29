/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    tableName: 'user_in_sails',

    schema: true,

    attributes: {

	username:{
	    type: 'string',
	    required: true,
	    unique: true,
	    maxLength: 20,
	    minLength: 5
	},

	name: {
	    type: 'string',
	    required: true,
	},

	email: {
	    type: 'email',
	    required: true
	},

	encryptedPassword: {
	    type: 'string'
	},

	/* ROLES */
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
	},

	toJson: function(){
	    var obj = this.toObject();
	    delete obj.password;
	    delete obj.confirmation;
	    delete obj.encryptedPassword;
	    delete obj._csrf;
	    return obj;
	}
    },

    beforeValidation: function(values, next) {
	if(typeof values.admin !== 'undefined'){
	    if(values.admin === 'unchecked'){
		values.admin = false;
	    }else if(values.admin[1] === 'on'){
		values.admin = true;
	    }
	}
	next();
    },

    beforeCreate: function(values, next) {
	if(!values.password || values.password!=values.confirmation){
	    return next({err: ["Password doesn't match password confirmation"]});
	}
	require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
	    if(err) return next(err);
	    values.encryptedPassword = encryptedPassword;

	    next();
	});
    }
    
};
