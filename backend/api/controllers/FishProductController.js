/**
 * FishProductController
 *
 * @description :: Server-side logic for managing fishproducts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {

    find: function(req, res, next) {
	if(req.param('search'))
	    sails.controllers.fishproduct.listFiltered(req, res, next);
	else
	    require("sails/lib/hooks/blueprints/actions/find")(req, res, next);
    },

    listFiltered: function(req, res, next) {
	SkuPickerService.pickProducts(req.params.all(), true, function(err, records, count) {
	    if(!err) {
		res.ok(records);
	    } else {
		sails.log.error("Error listing fish products: \n"+err);
		res.serverError(err);
	    }
	});
    },

    create: function(req, res, next) {
	var params = req.params.all();
	ProductCodingService.getNextFishProductCode(params.family, function(err, code) {
	    if(err) return res.serverError(err);
	    params.code = code;
	    FishProduct.create(params).exec(function(err, product) {
		if(err) return res.serverError(err);
		return res.ok(product);
	    });
	});
    }    

};
