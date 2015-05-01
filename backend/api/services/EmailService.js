// EmailService.js
var nodemailer = require('nodemailer');

var defaultTransporter = nodemailer.createTransport(sails.config.emailAccount);


module.exports = {

    send: function(options, cb) {
	/* Send email with provided options, example option object below */
	var from = sails.config.emailAccount.from;
	var mailOptions = {
	    from	: from.name + ' <' + from.email + '>',
	    to		: options.to,
	    subject	: options.subject,
	    text	: options.text,
	    html	: options.html
	};
	defaultTransporter.sendMail(mailOptions, cb);
    },

    sendAs: function(options, cb) {
	/* Send email with provided options on behalf on indicated google user */
	var from = sails.config.emailAccount.from;
	var mailOptions = {
	    from	: options.fromName + ' <' + from.email + '>',
	    replyTo	: options.fromName + ' <' + options.fromEmail + '>',
	    cc		: options.fromName + ' <' + options.fromEmail + '>',
	    to		: options.to,
	    subject	: options.subject,
	    text	: options.text,
	    html	: options.html
	};
	defaultTransporter.sendMail(mailOptions, cb);
    },

    sendInviteEmail: function(options) {
	/* Send email invitation to new user */
	//TODO
    }
};
