/**
 * FishVariantController
 *
 * @description :: Server-side logic for managing fishvariants
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    index: function(req, res, next) {
	res.view('fish/index');
    }
	
};

