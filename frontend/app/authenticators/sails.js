import Ember from 'ember';
import Jwt from 'simple-auth-token/authenticators/jwt';
import env from '../config/environment';

export default Jwt.extend({

    conf: env['simple-auth-sails'],

    makeRequest: function(tokenEndpoint, data) {
	var _this = this;
	return new Ember.RSVP.Promise(function(resolve, reject) {
	    // make the request to authenticate the user
	    Ember.$.ajax({
		url: tokenEndpoint,
		type: 'POST',
		data: JSON.stringify(data),
		dataType: 'json',
		contentType: 'application/json',
		beforeSend: function(xhr, settings) {
		    xhr.setRequestHeader('Accept', settings.accepts.json);
		},
		headers: _this.headers
	    }).then(function(response) {
		// check for waterlock error
		if(response.error) {
		    Ember.run(function() {
			reject({responseJSON: response}, null, response.error);
		    });
		} else {
		    // all properties this promise resolves with will be available through the session
		    Ember.run(function() {
			resolve(response);
		    });
		}
	    }, function(xhr, status, error) {
		Ember.run(function() {
		    reject(xhr, status, error);
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
