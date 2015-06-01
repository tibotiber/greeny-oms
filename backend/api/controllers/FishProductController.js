/**
 * FishProductController
 *
 * @description :: Server-side logic for managing fishproducts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var skuPicker = require('../services/SkuPickerService');


module.exports = {

    find: function(req, res, next) {
	if(req.param('search'))
	    sails.controllers.fishproduct.listFiltered(req, res, next);
	else
	    require("../../node_modules/sails/lib/hooks/blueprints/actions/find")(req, res, next);
    },

    listFiltered: function(req, res, next) {
	skuPicker.pickProducts(req.params.all(), true, function(err, records, count) {
	    if(!err) {
		res.ok(records);
	    } else {
		sails.log.error("Error listing fish products: \n"+err);
		res.serverError(err);
	    }
	});
    },

    create: function(req, res, next) {
	var params = JSON.parse(JSON.stringify(req.params.all()));
	delete params.id;	
	ProductCodingService.getNextFishProductCode(params.family, function(err, code) {
	    if(!err) {
		params.code = code;
		FishProduct.create(params).exec(function(err, created) {
		    if(!err) {
			res.json({
			    Result: 'OK',
			    Record: created
			});
		    } else {
			sails.log.error("Error creating fish product: \n"+err);
			res.json({
			    Result: 'Error',
			    Message: err
			});
		    }
		});
	    } else {
		sails.log.error("Error creating fish product code: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    update: function(req, res, next) {
	FishProduct.update(req.param('code'), req.params.all()).exec(function(err, updated) {
	    if(!err) {
		res.json({
		    Result: 'OK',
		    Record: updated
		});
	    } else {
		sails.log.error("Error updating fish product: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    destroy: function(req, res, next) {
	FishProduct.destroy(req.param('code')).exec(function(err, destroyed) {
	    if(!err) {
		res.json({
		    Result: 'OK'
		});
	    } else {
		sails.log.error("Error destroying fish product: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    }
    
};

