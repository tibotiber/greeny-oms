module.exports = function(req, res, next) {
    
    if(!req.session.authenticated)
        return res.redirect('/login');
    else if(req.session.User.id != req.param('id') && !req.session.User.admin)
	return res.forbidden();
    else
	return next();

};
