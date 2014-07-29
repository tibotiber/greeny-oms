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
var uu = require('underscore'),
validateReqParams = require('../services/validateReqParams');


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
/*
	// boolify admin value
	var params = req.params.all();
	if(params.admin == "true") {
	    params.admin = true;
	} else if(params.admin == "false") {
	    params.admin = false;
	}
*/
	User.update(req.param('id'), req.params.all(), function userUpdated(err){
	    if(err){
		sails.log.error(err);
		return res.redirect('/user/edit/' + req.param('id'));
	    }
	    res.redirect('/user/show/' + req.param('id'));
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
