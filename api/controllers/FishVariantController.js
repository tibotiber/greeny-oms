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
		var records = found.map(function(item) {
		    item.invoicename = item.getInvoiceName();
		    return item;
		});
		// respond to query
		res.json({
		    Result: 'OK',
		    Records: records
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

