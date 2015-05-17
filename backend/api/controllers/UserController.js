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

var UPLOAD_PATH = '../../assets/upload/profile-pics/';


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

    changePwd: function(req, res, next){
	User.findOne(req.param('id'), function foundUser(err, user){
	    if(err) return next(err);
	    if(!user) return next("User doesn't exist");
	    sails.log.verbose("User edited: "+user.name);
	    res.view({
		user:user
	    });
	});
    },

    updatePwd: function(req, res, next){
	// check if current password given is ok, then proceed
	User.findOne(req.param('id'), function(err, user){
	    if(err) return next(err);
	    if(!user) return res.redirect('/user/changePwd/' + req.param('id'));
	    // user found, check password
	    bcrypt.compare(req.param('currentPassword')||"", user.encryptedPassword, function(err, valid){
		if(err) return next(err);
		if(!valid && !req.session.user.admin) return res.redirect('/user/changePwd/' + req.param('id'));
		// password ok: update password
		User.update(req.param('id'), req.params.all(), function userUpdated(err){
		    if(err){
			sails.log.error(err);
			return res.redirect('/user/changePwd/' + req.param('id'));
		    }
		    res.redirect('/user/show/' + req.param('id'));
		});
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
    },

    revokeGoogleApiTokens: function(req, res, next){
	User.update({}, {googleApiToken: null}).exec(function(err, updated) {
	    if (err)
		return res.serverError("Could not revoke api tokens:\n"+err);
	    else
		return res.ok("All Google API tokens have been revoked.");
	});
    }
    
});
