/**
 * UserController.js 
 * 
 * @module      :: Controller
 * @description :: Provides the base user
 *                 actions used to make waterlock work.
 *                 
 * @docs        :: http://waterlock.ninja/documentation
 */
var bcrypt = require('bcrypt');


module.exports = require('waterlock').actions.user({
    
    index: function(req,res, next) {
	User.find().sort('id').populate('auth').exec(function(err, users) {
	    if(err) return next(err);
	    res.view({
		users: users
	    });
	});
    },

    show: function(req, res, next){
	User.findOne(req.param('id')).populate('auth').exec(function(err, user) {
	    if(err) return next(err);
	    if(!user)return next();
	    res.view({
		user: user
	    });
	});
    },

    edit: function(req, res, next){
	User.findOne(req.param('id')).populate('auth').exec(function(err, user) {
	    if(err) return next(err);
	    if(!user) return next("User doesn't exist");
	    sails.log.verbose("User edited: "+user.name);
	    res.view({
		user:user
	    });
	});
    },

    destroy: function(req, res, next){
	User.findOne(req.param('id')).populate('auth').exec(function(err, user) {
	    if(err) return next(err);
	    if(!user) return next("User doesn't exist");
	    User.destroy(req.param('id'), function userDestroyed(err){
		if(err) return next(err);
		sails.log.warn("User account destroyed: "+user.auth.username);
	    });
	    res.redirect('/user');
	});
    }

});
