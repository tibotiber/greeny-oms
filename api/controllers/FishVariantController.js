/**
 * FishVariantController
 *
 * @description :: Server-side logic for managing fishvariants
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    index: function(req, res, next) {
	res.view('fish/index');
    },

    listByProduct: function(req, res, next) {
	// list all variants for one product
	FishVariant.find({product: req.param('code')}).populateAll().exec(function(err, found) {
	    if(!err) {
		// prepare records
		async.map(found, function(item, cb) {
		    // manual n-2 population (until waterline handles it)
		    FishFamily.findOne(item.product.family).exec(function(err, family) {
			if(!err) {
			    item.product.family = family;
			    item.invoicename = item.getInvoiceName();
			    item.product = item.product.code;
			    cb(null, item);
			} else {
			    cb(err);
			}
		    });
		}, function(err, records) {
		    if(!err) {
			// respond to query
			res.json({
			    Result: 'OK',
			    Records: records
			});
		    } else {
			sails.log.error("Error finding family for fish variants: \n"+err);
			res.json({
			    Result: 'Error',
			    Message: err
			});
		    }
		});
	    } else {
		sails.log.error("Error listing fish variants: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    create: function(req, res, next) {
	var params = JSON.parse(JSON.stringify(req.params.all()));
	delete params.id;	
	ProductCodingService.getFishVariantCode(params.product, params.size, params.gender, params.grade, function(err, sku) {
	    if(!err) {
		params.sku = sku;
		FishVariant.create(params).exec(function(err, created) {
		    if(!err) {
			res.json({
			    Result: 'OK',
			    Record: created
			});
		    } else {
			sails.log.error("Error creating fish variant: \n"+err);
			res.json({
			    Result: 'Error',
			    Message: err
			});
		    }
		});
	    } else {
		sails.log.error("Error creating fish variant code: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    update: function(req, res, next) {
	var params = JSON.parse(JSON.stringify(req.params.all()));
	ProductCodingService.getFishVariantCode(params.product, params.size, params.gender, params.grade, function(err, sku) {
	    if(!err) {
		params.sku = sku;
		FishVariant.update(req.param('sku'), params).exec(function(err, updated) {
		    if(!err) {
			res.json({
			    Result: 'OK',
			    Record: updated
			});
		    } else {
			sails.log.error("Error updating fish variant: \n"+err);
			res.json({
			    Result: 'Error',
			    Message: err
			});
		    }
		});
	    } else {
		sails.log.error("Error updating fish variant code: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    destroy: function(req, res, next) {
	FishVariant.destroy(req.param('sku')).exec(function(err, destroyed) {
	    if(!err) {
		res.json({
		    Result: 'OK'
		});
	    } else {
		sails.log.error("Error destroying fish variant: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    recalculateSkuPickerCache: function(req, res, next) {
	// start recalculating and respond
	SkuPickerService.recalculateCache(function(err) {
	    if(!err)
		res.ok("Cached sku picker field has been updated for the whole database.");
	    else
		res.serverError(err);
	});
    }

};

