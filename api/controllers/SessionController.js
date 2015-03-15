/**
 * SessionController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
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
var bcrypt = require('bcrypt');

module.exports = {
    
    _config: {},

    'new': function(req, res) {
	res.view({
	    layout: "basic_layout"
	});
    },

    create: function(req, res, next){
	if(!req.param('username') || !req.param('password'))
	    return res.redirect("/login");
	// search user
	var credentials = {username: req.param('username')};
	User.findOne(credentials).exec(function(err, user){
	    if(err) return next(err);
	    if(!user) return res.redirect('/login');
	    // user found, check password
	    bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid){
		if(err) return next(err);
		if(!valid) return res.redirect('/login');
		// password ok: create session
		req.session.authenticated = true;
		req.session.User = user;
		// log to display who is connected
		sails.log("User logged in: "+user.username);
		// redirect to home page
		res.redirect('/');
	    });
	});
    },

    destroy: function(req, res, next){
	sails.log("User logged out: "+req.session.User.username);
	req.session.destroy();
	res.redirect('/login');
    },

    index: function(req, res, next) {
	/* this is the main redirect of the app */
	if(!req.session.authenticated)
	    res.redirect('/login');
	else
	    res.view('home/index');
    }
  
};
