module.exports = function(req, res, next) {
    if(!(req.session.authenticated && req.session.user))
	return res.forbidden();
    var admin			= req.session.user.admin;
    var manager			= req.session.user.manager;
    var sales			= req.session.user.sales;
    var purchasing		= req.session.user.purchasing;
    var quality_check		= req.session.user.quality_check;
    var packing			= req.session.user.packing;
    var documentation		= req.session.user.documentation;
    var accounts_payable	= req.session.user.accounts_payable;
    var accounts_receivable	= req.session.user.accounts_receivable;
    if(admin || accounts_payable || packing)
	return next();
    res.forbidden();
};
