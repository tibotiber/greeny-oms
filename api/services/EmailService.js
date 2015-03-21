// EmailService.js
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

var defaultTransporter = nodemailer.createTransport(sails.config.emailAccount);
var planecq_support = 'Planecq Support <support@planecq.com>';
var planecq_noreply = 'Planecq <no-reply@planecq.com>';


module.exports = {

    send: function(options, cb) {
	/* Send email with provided options, example option object below */
	// var mailOptions = {
	//     from: 'Fred Foo <foo@blurdybloop.com>',
	//     to: 'bar@blurdybloop.com, baz@blurdybloop.com',
	//     subject: 'Hello',
	//     text: 'Hello world',
	//     html: '<b>Hello world</b>'
	// };
	var mailOptions = {
	    from: planecq_noreply,
	    to: options.to,
	    subject: options.subject,
	    text: options.text,
	    html: options.html
	};
	defaultTransporter.sendMail(mailOptions, cb);
    },

    sendAs: function(options, cb) {
	/* Send email with provided options on behalf on indicated google user */
	// first check if a token has been stored for this user
	User.findByEmail(options.fromEmail).exec(function(err, user) {
	    if (!err && user[0].googleApiToken) {
		// if a token was stored, use it
		EmailService.sendAsWithOAuth2(options, {access_token: user[0].googleApiToken}, function(error, info) {
		    cb(null, error, info);
		});
	    } else {
		// else get OAuth2 access token from Google
		// See https://developers.google.com/accounts/docs/OAuth2WebServer
		var scope = 'https://mail.google.com/';
		var responseType = 'code';
		var approvalPrompt = 'auto';
		var accessType = 'online';
		var url = "https://accounts.google.com/o/oauth2/auth?scope="+scope+
		    "&state="+JSON.stringify(options)+
		    "&redirect_uri="+sails.config.googleXOAuth2.redirectUri+
		    "&response_type="+responseType+
		    "&client_id="+sails.config.googleXOAuth2.clientId+
		    "&approval_prompt="+approvalPrompt+
		    "&login_hint="+options.fromEmail+
		    "&access_type="+accessType;
		cb(url);
	    }
	});
	// end of process in 'sendAsWithOAuth2' after Google API callback to IntegrationController
    },

    sendAsWithOAuth2: function(options, token, cb) {
	/* End of process started in 'sendAs', after callback from Google API */
	// create OAuth2 generator
	var oauth2Generator = xoauth2.createXOAuth2Generator({
	    user: options.fromEmail,
	    clientId: sails.config.googleXOAuth2.clientId,
	    clientSecret: sails.config.googleXOAuth2.clientSecret,
	    refreshToken: token.refresh_token,
	    accessToken: token.access_token,
	    timeout: token.expires_in
	});
	// listen for token updates (you probably want to store these to a db)
        oauth2Generator.on('token', function(token){
	    sails.log.debug('New token for %s: %s', token.user, token.accessToken);
	});
	// login
	var transporter = nodemailer.createTransport({
	    service: 'gmail',
	    auth: {
		xoauth2: oauth2Generator
	    },
	    debug: true
	});
	// debug communocation with Google API (uncomment below)
	// transporter.on('log', sails.log.debug);
	// send email
	var mailOptions = {
	    from: options.fromName+' <'+options.fromEmail+'>',
	    to: options.to,
	    subject: options.subject,
	    text: options.text,
	    html: options.html
	}
	transporter.sendMail(mailOptions, cb);
    },

    sendInviteEmail: function(options) {
	/* Send email invitation to new user */
	//TODO
    }
};
