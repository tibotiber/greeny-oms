module.exports = function(req, res, next) {
    if(!req.session.authenticated)
        return res.json({redirect:'/login'});
    else if(!req.session.user.admin)
	return res.forbidden();
    else
	return next();
};
