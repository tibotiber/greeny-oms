/**
 * Default 403 (Forbidden) middleware
 *
 * This middleware can be invoked from a controller or policy:
 * res.forbidden( [message] )
 *
 *
 * @param {String|Object|Array} message
 *      optional message to inject into view locals or JSON response
 * 
 */

module.exports[403] = function badRequest(message, req, res) {

    /*
     * NOTE: This function is Sails middleware-- that means that not only do `req` and `res`
     * work just like their Express equivalents to handle HTTP requests, they also simulate
     * the same interface for receiving socket messages.
     */

    var statusCode = 403;
    var result = {
	status: statusCode
    };

    // Optional message
    if (message)
	result.message = message;
    else
	result.message = "You do not have permission to see the page you are trying to reach.";
    
    // If the user-agent wants a JSON response, send json
    if (req.wantsJSON) {
	return res.json(result, result.status);
    }

    // Set status code and view locals
    res.status(result.status);
    for (var key in result) {
	res.locals[key] = result[key];
    }

    // Serve the `views/403.*` page
    result.layout = "basic_layout";
    res.view('403', result);

};
