import Ember from 'ember';
import Token from 'simple-auth-token/authenticators/token';
import env from '../config/environment';

export default Token.extend({

    conf: env['simple-auth-sails'],

    makeRequest: function(data) {
	var _this = this;
	return new Ember.RSVP.Promise(function(resolve, reject) {
	    // make the request to authenticate the user
	    Ember.$.ajax({
		url: _this.conf.serverLoginEndpoint,
		type: 'POST',
		data: JSON.stringify(data),
		dataType: 'json',
		contentType: 'application/json',
		beforeSend: function(xhr, settings) {
		    xhr.setRequestHeader('Accept', settings.accepts.json);
		},
		headers: _this.headers
	    }).then(function(response) {
		var user = response;
		/*
		// authenticated, get jwt token >> cannot since session not resolved yet
	        Ember.$.ajax({
		    url: _this.conf.serverTokenEndpoint,
		    type: 'GET',
		    beforeSend: function(xhr, settings) {
			xhr.setRequestHeader('Accept', settings.accepts.json);
		    },
		    headers: _this.headers
		}).then(function(response) {
		    var token = response;
		    console.log(token);
		    // token received: all properties this promise resolves with will be available through the session
		    Ember.run(function() {
			resolve({ user: user, access_token: token });
		    });
		}, function(xhr) {
		    Ember.run(function() {
			reject(xhr);
		    });
		});
		*/
		Ember.run(function() {
		    resolve({user_id: user.id, user: user});
		});
	    }, function(xhr) {
	        Ember.run(function() {
		    reject(xhr);
		});
	    });
	});
    },

    invalidate: function(data) {
	var _this = this;
	return new Ember.RSVP.Promise(function(resolve, reject) {
	    // make the request to logout the user
	    Ember.$.ajax({
		url: _this.conf.serverLogoutEndpoint,
		type: 'GET',
		beforeSend: function(xhr, settings) {
		    xhr.setRequestHeader('Accept', settings.accepts.json);
		},
		headers: _this.headers
	    }).then(function(response) {
		Ember.run(function() {
		    resolve();
		});
	    }, function(xhr) {
		Ember.run(function() {
		    reject(xhr);
		});
	    });
	});
    }

});
