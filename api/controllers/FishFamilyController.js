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
    },

    listNames: function(req, res, next) {
	FishFamily.find({}).sort('name').exec(function(err, found) {
	    if(!err) {
		var familyList = [];
		found.forEach(function(family) {
		    familyList.push({
			DisplayText: family.name,
			Value: family.id
		    });
		});
		res.json({
		    Result: "OK",
		    Options: familyList
		});
	    } else {
		res.json({
		    Result: "ERROR",
		    Message: err
		});
	    }
	});
    }

};

