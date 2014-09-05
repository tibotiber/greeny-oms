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
    }
	
};

