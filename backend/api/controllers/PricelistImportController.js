/**
 * this
 *
 * @description :: Server-side logic for managing pricelistimports
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    find: function(req, res, next) {
	PricelistImportService.find(function(err){
	    if(!err) res.ok("Pricelist imported successfully");
	    else res.serverError(err);
	});
    }
};
