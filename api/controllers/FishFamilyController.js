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
    },

    create: function(req, res, next) {
	var params = JSON.parse(JSON.stringify(req.params.all()));
	delete params.id;	
	FishFamily.create(params).exec(function(err, created) {
	    if(!err) {
		res.json({
		    Result: 'OK',
		    Record: created
		});
	    } else {
		sails.log.error("Error creating fish family: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    update: function(req, res, next) {
	FishFamily.update(req.param('id'), req.params.all()).exec(function(err, updated) {
	    if(!err) {
		res.json({
		    Result: 'OK',
		    Record: updated
		});
	    } else {
		sails.log.error("Error updating fish family: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    destroy: function(req, res, next) {
	FishFamily.destroy(req.param('id')).exec(function(err, destroyed) {
	    if(!err) {
		res.json({
		    Result: 'OK'
		});
	    } else {
		sails.log.error("Error destroying fish family: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    }

};

