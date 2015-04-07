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
		// all properties this promise resolves with will be available through the session
		Ember.run(function() {
		    resolve(response);
		});
	    }, function(xhr) {
	        Ember.run(function() {
		    reject(xhr);
		});
	    });
	});
    },

    invalidate: function() {
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
	    }).then(function() {
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
