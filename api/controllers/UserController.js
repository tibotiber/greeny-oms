/**
 * UserController
 *
 * @module      :: Controller
 * @description:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var uu = require('underscore');
var fs = require('fs');
var bcrypt = require('bcrypt');

var UPLOAD_PATH = '../../assets/upload/profile-pics/';


module.exports = {

    _config: {},

    'new': function(req, res){
	res.view();
    },

    firstEver: function(req, res){
	// change user controller default policy to true to access this
	// then create first user in app
	// then use psql to give admin rights
	// then put back user controller default policy to 'isAdmin'
	res.view('user/new', {layout: 'basic_layout'})
    },

    index: function(req,res, next) {
	User.find().sort('id').exec(function foundUsers(err, users){
	    if(err) return next(err);

	    res.view({
		users: users
	    });
	});
    },

    create: function(req, res, next){
	var params = JSON.parse(JSON.stringify(req.params.all()));
	delete params.id;
	User.create(params).exec(function userCreated (err, user){
	    if(err) return next("Error in the user creation: "+err);
	    sails.log("User \"" + user.username + "\" created");
	    res.redirect("/user/show/" + user.id);
	});
    },

    show: function(req, res, next){
	User.findOne(req.param('id'), function foundUser(err, user){
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
		    if(!err && req.session.User.id == params.id){
			req.session.User = userUpdated[0];
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
	User.findOne(req.param('id'), function foundUser(err, user){
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
		if(!valid && !req.session.User.admin) return res.redirect('/user/changePwd/' + req.param('id'));
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
	User.findOne(req.param('id'), function foundUser(err, user){
	    if(err) return next(err);
	    if(!user) return next("User doesn't exist");
	    User.destroy(req.param('id'), function userDestroyed(err){
		if(err) return next(err);
		sails.log.warn("User account destroyed: "+user.username);
	    });
	    res.redirect('/user');
	});
    }
};
