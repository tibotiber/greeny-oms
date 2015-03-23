module.exports = function(req, res, next) {
    if(!(req.session.authenticated && req.session.User))
	return res.forbidden();
    var admin			= req.session.User.admin;
    var manager			= req.session.User.manager;
    var sales			= req.session.User.sales;
    var purchasing		= req.session.User.purchasing;
    var quality_check		= req.session.User.quality_check;
    var packing			= req.session.User.packing;
    var documentation		= req.session.User.documentation;
    var accounts_payable	= req.session.User.accounts_payable;
    var accounts_receivable	= req.session.User.accounts_receivable;
    if(admin || accounts_payable || sales)
	return next();
    res.forbidden();
};
