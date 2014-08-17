/**
 * FishProductController
 *
 * @description :: Server-side logic for managing fishproducts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    index: function(req, res, next) {
	FishProduct.find({}).populateAll().exec(function(err, found) {
	    res.json({products: found});
	});
    }
	
};

