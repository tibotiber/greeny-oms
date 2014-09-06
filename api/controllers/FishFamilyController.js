/**
 * FishFamilyController
 *
 * @description :: Server-side logic for managing fishfamilies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    index: function(req, res, next) {
	res.view('fish/family');
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
    },

    list: function(req, res, next) {
	FishFamily.find({}).sort('name').exec(function(err, found) {
	    if(!err) {
		res.json({
		    Result: 'OK',
		    Records: found
		});
	    } else {
		sails.log.error("Error listing fish families: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    }

};

