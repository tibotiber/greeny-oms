/**
 * FreightRouteController
 *
 * @description :: Server-side logic for managing freightroutes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    listByQuotation: function(req, res, next) {
	FreightRoute.find({quotation: req.param('quotation')}).exec(function(err, found) {
	    if(!err) {
		res.json({
		    Result: 'OK',
		    Records: found
		});
	    } else {
		sails.log.error("Error listing freight routes:\n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    create: function(req, res, next) {
	var params = req.params.all();
	delete params.id;
	FreightRoute.create(params).exec(function(err, created) {
	    if(!err) {
		res.json({
		    Result: 'OK',
		    Record: created
		});
	    } else {
		sails.log.error("Error creating freight route:\n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    update: function(req, res, next) {
	var params = req.params.all();
	FreightRoute.update(params.id, params).exec(function(err, updated) {
	    if(!err) {
		res.json({
		    Result: 'OK',
		    Record: updated
		});
	    } else {
		sails.log.error("Error updating freight route:\n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    destroy: function(req, res, next) {
	var params = req.params.all();
	FreightRoute.destroy(params.id).exec(function(err, destroyed) {
	    if(!err) {
		res.json({
		    Result: 'OK'
		});
	    } else {
		sails.log.error("Error deleting freight route:\n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    }    

};
