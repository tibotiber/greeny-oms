/**
 * IntegrationController
 *
 * @description :: Server-side logic for managing integrations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var request = require('request');


module.exports = {

    oauth2: function(req, res, next) {
	/* 
	 * handle callback form Google API for email OAuth2 
	 * See https://developers.google.com/accounts/docs/OAuth2WebServer
	 * ERROR: <url>?error=access_denied&state=/profile
	 * AUTHORIZED: <url>?state=<whatever_state_was_sent>&code=4/P7q7W91a-oMsCeLvIaQm6bTrgtp7
	 */
	var options = JSON.parse(req.param('state'));
	var code = req.param('code');
	
	// exchange code for an access token and a refresh token
	var grantType = 'authorization_code';
	var tokenReq = 'code=' + code +
	    '&client_id=' + sails.config.googleXOAuth2.clientId +
	    '&client_secret=' + sails.config.googleXOAuth2.clientSecret +
	    '&redirect_uri=' + sails.config.googleXOAuth2.redirectUri +
	    '&grant_type=' + grantType;
	
	request({
	    method: 'POST',
	    headers: {
		'Content-length': tokenReq.length,
		'Content-type':'application/x-www-form-urlencoded'
	    },
	    uri:'https://accounts.google.com/o/oauth2/token',
	    body: tokenReq
	}, function (error, response, body) {
	    if(response.statusCode == 200){
		var token = JSON.parse(body);
		// store token for this user
		User.update({email: options.fromEmail},{googleApiToken: token.access_token}).exec(function(err, updated) {
		    // token stored (ignore errors), then use token to send email
		    EmailService.sendAsWithOAuth2(options, token, function(err, info) {
			if(err) 
			    return res.serverError('Error sending email:\n'+err);
			else
			    return res.ok('Your email was sent successfully.');
		    });
		});
	    } else {
		return res.serverError('Error fetching OAuth2 token with Google API: '+ response.statusCode + '\n' + body);
	    }
	});
    }
    
};
