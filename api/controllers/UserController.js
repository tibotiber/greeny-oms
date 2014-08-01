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
var validateReqParams = require('../services/validateReqParams');

var UPLOAD_PATH = 'assets/upload/profile-pics/';

function safeFilename(name) {
    name = name.replace(/ /g, '-');
    name = name.replace(/[^A-Za-z0-9-_\.]/g, '');
    name = name.replace(/\.+/g, '.');
    name = name.replace(/-+/g, '-');
    name = name.replace(/_+/g, '_');
    return name;
}

function fileMinusExt(fileName) {
    return fileName.split('.').slice(0, -1).join('.');
}

function fileExtension(fileName) {
    return fileName.split('.').slice(-1);
}


module.exports = {

    _config: {},

    'new': function(req, res){
	res.view();
    },

    index: function(req,res, next) {
	User.find().sort('id').done(function foundUsers(err, users){
	    if(err) return next(err);

	    res.view({
		users: users
	    });
	});
    },

    create: function(req, res, next){
	if(!validateReqParams(req.params.all(), res)) return;
	User.create(req.params.all(), function userCreated (err, user){
	    if(err) return next("Error in the user creation.");
	    sails.log("User \"" + user.username + "\" created");
	    res.redirect("/user/show/" + user.id);
	});
    },

    show: function(req, res, next){
	if(!validateReqParams(req.params.all(), res)) return;
	User.findOne(req.param('id'), function foundUser(err, user){
	    if(err) return next(err);
	    if(!user)return next();
	    res.view({
		user: user
	    });
	});
    },

    update: function(req, res, next){
	if(!validateReqParams(req.params.all(), res)) return;
	// initialize updates object
	var params = JSON.parse(JSON.stringify(req.params.all()));
	// upload profile pic if any
	var uploadProfilePic = function(file, cb) {
	    if(file.originalFilename != "") {
		var fileName = safeFilename(file.name);
		var filePath = UPLOAD_PATH + fileName;
		fs.readFile(file.path, function (err, data) {
		    if (err) {
			cb(err, null);
		    } else {
			if(!fs.existsSync(filePath)) {
			    fs.writeFile(filePath, data, function (err) {
				if (err)
				    cb(err, null);
				else
				    cb(null, fileName);
				});
			} else {
			    var i = 1;
			    while(fs.existsSync(fileMinusExt(filePath)+i+'.'+fileExtension(filePath)))
				i++;
			    fileName = fileMinusExt(fileName)+i+'.'+fileExtension(fileName);
			    filePath = UPLOAD_PATH + fileName;
			    fs.writeFile(filePath, data, function (err) {
				if (err)
				    cb(err, null);
				else
				    cb(null, fileName);
			    });
			}
		    }
		});
	    } else {
		cb(null, null);
	    }
	}
	uploadProfilePic(req.files['profile_pic'], function(err, filename) {
	    if(err)
		log.error("Error uploading new profile pic: "+err);
	    if(filename)
		params['profile_pic'] = filename;
	    // update user info
	    User.update(params.id, params, function userUpdated(err){
		if(err){
		    sails.log.error(err);
		    return res.redirect('/user/edit/' + req.param('id'));
		}
		res.redirect('/user/show/' + req.param('id'));
	    });
	});
    },

    edit: function(req, res, next){
	if(!validateReqParams(req.params.all(), res)) return;
	User.findOne(req.param('id'), function foundUser(err, user){
	    if(err) return next(err);
	    if(!user) return next("User doesn't exist");
	    sails.log.verbose("User edited: "+user.name);
	    res.view({
		user:user
	    });
	});
    },

    destroy: function(req, res, next){
	if(!validateReqParams(req.params.all(), res)) return;
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
