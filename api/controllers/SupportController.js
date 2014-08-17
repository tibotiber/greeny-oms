/**
 * SupportController
 *
 * @description :: Server-side logic for managing supports
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    index: function(req, res) {
	res.view();
    },

    post: function(req, res, next) {
	// build email parameters
	var message = 'Ticket type: ' + req.param('type') + '\n' +
	    'Issue frequency: ' + req.param('frequency') + '\n\n' +
	    'Message:\n' + req.param('description') + '\n\n' +
	    'Error:\n';
	if(req.param('error'))
	    message += req.param('error');
	else
	    message += 'No copy of error provided.';

	var options = {
	    fromName: req.session.User.name,
	    fromEmail: req.session.User.email,
	    to: 'support@planecq.com',
	    subject: req.param('subject'),
	    text: message
	}
	    
	// send email
	EmailService.sendAs(options, function(url, error, info) {
	    if(url) return res.redirect(url);
	    else if(error) return res.serverError('Error sending email:\n'+err);
	    else return res.ok('Your email was sent successfully.');
	});
	
    }
    
};

