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
	})
    },

    create: function(req, res, next){
	if(!req.param('username') || !req.param('password')){
	    var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired', message: 'You must enter a username and a password'}];
	    req.session.flash = {
		err: usernamePasswordRequiredError
	    }

	    // in case of error, we redirect to user creation page
	    res.redirect("/session/new");
	    return;
	}

	// check by username
	var credentials = {username: req.param('username')};
	User.findOne(credentials).done(function(err, user){
	    if(err) return next(err);

	    if(!user){
		var noAccountError = [{name: 'noAccount', message: 'The username ' + req.param('username') + ' was not found'}];
		req.session.flash = {
		    err: noAccountError
		}
		res.redirect('/session/new');
		return;
	    };

	    bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid){
		if(err) return next(err);

		if(!valid){
		    var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatch', message: 'Invalid username and password combination'}];
		    req.session.flash = {
			err: usernamePasswordMismatchError
		    }
		    res.redirect('/session/new');
		    return;
		};

		// we authenticate the session directly once the user is created and bound it to the user created
		req.session.authenticated = true;
		req.session.User = user;

		// logs now to see who is connected
		sails.log("User logged in: "+user.username);

		// redirect to home page
		res.redirect('/');
	    });
	});
    },

    destroy: function(req, res, next){
	sails.log("User logged out: "+req.session.User.username);
	req.session.destroy();
	res.redirect('/session/new');
    }
  
};
