/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(data);
 * return res.ok(data, 'auth/login');
 *
 * @param  {Object} data
 * @param  {String|Object} options
 *          - pass string to render specified view
 */

module.exports = function sendOK (data, options) {

    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;
    var sails = req._sails;

    // Set status code
    res.status(200);

    // default message
    if(data == undefined)
	data = 'Your request was processed with success.';

    // If appropriate, serve data as JSON(P)
    if (req.wantsJSON)
	return res.jsonx(data);

    // If second argument is a string, we take that to mean it refers to a view.
    // If it was omitted, use an empty object (`{}`)
    options = (typeof options === 'string') ? { view: options } : options || {};

    // If a view was provided in options, serve it.
    // Otherwise try to guess an appropriate view, or if that doesn't
    // work, just send JSON.
    if (options.view) {
	return res.view(options.view, { data: data });
    }

    // If no second argument provided, try to serve the default view,
    // but fall back to sending JSON(P) if any errors occur.
    else return res.view('200', { layout: 'basic_layout', data: data }, function (err, html) {

	// If a view error occured, fall back to JSON(P).
	if (err) {
	    //
	    // Additionally:
	    // • If the view was missing, ignore the error but provide a verbose log.
	    if (err.code === 'E_VIEW_FAILED') {
		sails.log.verbose('res.ok() :: Could not locate view for success page (sending JSON instead).  Details: ',err);
	    }
	    // Otherwise, if this was a more serious error, log to the console with the details.
	    else {
		sails.log.warn('res.ok() :: When attempting to render success page view, an error occured (sending JSON instead).  Details: ', err);
	    }
	    return res.jsonx(data);
	}

	return res.send(html);
    });

};
