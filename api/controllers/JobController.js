/**
 * JobController
 *
 * @description :: Server-side logic for managing jobs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    skucache: function(req, res, next) {
	// recalculate sku cache for all products and variants
	SkuPickerService.recalculateCache(function(err) {
	    if(!err)
		res.ok("Cached sku picker field has been updated for the whole database.");
	    else
		res.serverError(err);
	});
    }

    
};
