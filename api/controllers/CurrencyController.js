/**
 * CurrencyController
 *
 * @description :: Server-side logic for managing currencies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    index: function(req, res, next) {
	res.view();
    },

    list: function(req, res, next) {
	Currency.find({}).exec(function(err, found) {
	    if(!err) {
		res.json({
		    Result: 'OK',
		    Records: found
		});
	    } else {
		sails.log.error("Error listing currencies: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    picker: function(req, res, next) {
	Currency.find({}).exec(function(err, found) {
	    if(!err) {
		res.json({
		    Result: 'OK',
		    Options: _.map(found, function(item) {
			return {
			    DisplayText: item.code,
			    Value: item.code
			};
		    })
		});
	    } else {
		sails.log.error("Error listing currencies: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    create: function(req, res, next) {
	var params = JSON.parse(JSON.stringify(req.params.all()));
	Currency.create(params).exec(function(err, created) {
	    if(!err) {
		res.json({
		    Result: 'OK',
		    Record: created
		});
	    } else {
		sails.log.error("Error creating currency: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    update: function(req, res, next) {
	Currency.update(req.param('code'), req.params.all()).exec(function(err, updated) {
	    if(!err) {
		res.json({
		    Result: 'OK',
		    Record: updated
		});
	    } else {
		sails.log.error("Error updating currency: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    destroy: function(req, res, next) {
	Currency.destroy(req.param('code')).exec(function(err, destroyed) {
	    if(!err) {
		res.json({
		    Result: 'OK'
		});
	    } else {
		sails.log.error("Error destroying currency: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    }
    
};

