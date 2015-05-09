/**
 * 403 (Forbidden) Handler
 *
 * Usage:
 * return res.forbidden();
 * return res.forbidden(err);
 * return res.forbidden(err, 'some/specific/forbidden/view');
 *
 * e.g.:
 * ```
 * return res.forbidden('Access denied.');
 * ```
 */

module.exports = function forbidden (data, options) {

    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;
    var sails = req._sails;

    // Default error
    if(!data) data = "You do not have permission to execute this request.";
    
    // Log error to console
    sails.log.verbose('Sending 403 ("Forbidden") response: \n',data);

    // Prepare json error
    if(_.isString(data)) data = {error: data};

    // Always respond with JSON
    return res.json(data);
    
};

