/**
 * isNotAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any unauthenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {
    if (!req.session.authenticated) return next();
    return res.forbidden('You must be signed out.');
};
