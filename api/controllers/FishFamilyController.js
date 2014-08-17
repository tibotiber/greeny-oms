/**
 * FishFamilyController
 *
 * @description :: Server-side logic for managing fishfamilies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    index: function(req, res, next) {
	FishFamily.find({}).exec(function(err, found) {
	    res.json({families: found});
	});
    }

};

