/**
 * SupportController
 *
 * @description :: Server-side logic for managing supports
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    _config: {
	pluralize: false
    },

    index: function(req, res) {
	res.view();
    },

    post: function(req, res, next) {
	// build email parameters
	var error = req.param('error') || 'No copy of error provided.';
	var message = '<strong>Ticket type:</strong> ' + req.param('type').value + '<br/>' +
	    '<strong>Issue frequency:</strong> ' + req.param('frequency').value + '<br/><br/>' +
	    '<strong>Message:</strong><br/>' + req.param('description') + '<br/><br/>' +
	    '<strong>Error:</strong><br/><code>' + error + '</code>';
	var options = {
	    fromName: req.session.user.name,
	    fromEmail: req.session.user.email,
	    // use 'support' to pipe email in to zendesk
	    // use 'help' to pipe email in to groove
	    // use 'thibaut' to use direct email support
	    to: 'help@planecq.com',
	    subject: req.param('subject'),
	    html: message
	};
	// send email
	EmailService.sendAs(options, function(error, info) {
	    res.json({
		error: error,
		success: info
	    });
	});
	
    }
    
};

