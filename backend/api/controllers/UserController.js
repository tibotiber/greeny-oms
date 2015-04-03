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

    update: function(req, res, next){
	// initialize updates object
	var params = JSON.parse(JSON.stringify(req.params.all()));
	// upload profile pic if any
	req.file('profile_pic').upload({
		dirname: UPLOAD_PATH,
		saveAs: req.param('username')+'.jpg'
	    }, function (err, uploadedFiles){
		if(err)
		    return res.serverError("Error uploading new profile pic: "+err);
		if(uploadedFiles.length > 0)
		    // update database
		    params.profile_pic = req.param('username')+'.jpg';
		// update user info
		User.update(params.id, params).exec(function(err, userUpdated) {
		    // update session if needed
		    if(!err && req.session.user.id == params.id){
			req.session.user = userUpdated[0];
		    } else {
			sails.log.error(err);
			return res.redirect('/user/edit/' + req.param('id'));
		    }
		    res.redirect('/user/show/' + req.param('id'));
		});
	    }
	);
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
