/**
 * AuthController
 *
 * @module      :: Controller
 * @description	:: Provides the base authentication
 *                 actions used to make waterlock work.
 *
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = require('waterlock').waterlocked({

    _config: {
	pluralize: false
    },

    index: function(req, res, next) {
	/* this is the main redirect of the app */
	if(!req.session.authenticated) {
	    res.view('login', {
		layout: "basic_layout"
	    });
	} else {
	    res.view('index');
	}
    },

    comingSoon: function(req, res, next) {
	if(!req.session.authenticated)
	    res.redirect('/');
	else
	    res.ok("This part is still under construction. Coming soon!");
    }
    
});
