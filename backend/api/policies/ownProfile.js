module.exports = function(req, res, next) {
    
    if(!req.session.authenticated)
        return res.redirect('/');
    else if(req.session.user.id != req.param('id') && !req.session.user.admin)
	return res.forbidden();
    else
	return next();

};
