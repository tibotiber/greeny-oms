/**
 * PricetierController
 *
 * @description :: Server-side logic for managing pricetiers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    index: function(req, res, next) {
	res.view();
    },

    list: function(req, res, next) {
	Pricetier.find({}).exec(function(err, found) {
	    if(!err) {
		res.json({
		    Result: 'OK',
		    Records: found
		});
	    } else {
		sails.log.error("Error listing pricetiers: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    picker: function(req, res, next) {
	var criteria;
	if(req.param('search')) {
	    criteria = {or : [
		{code: {contains: req.param('search')}},
		{name: {contains: req.param('search')}}
	    ]};
	} else {
	    criteria = {};
	}
	Pricetier.find(criteria).exec(function(err, found) {
	    if(!err) {
		var options = _.map(found, function(item) {
		    return {
			value: item.code,
			label: item.name + ' (' + item.code + ')'
		    };
		});
		if(req.param('format')==='jtable') {
		    res.json({
			Result: 'OK',
			Options: _.map(options, function(item) {
			    return {
				DisplayText: item.label,
				Value: item.value
			    };
			})
		    });
		} else {
		    res.json(options);
		}
	    } else {
		sails.log.error("Error listing pricetiers: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    create: function(req, res, next) {
	var params = JSON.parse(JSON.stringify(req.params.all()));
	Pricetier.create(params).exec(function(err, created) {
	    if(!err) {
		res.json({
		    Result: 'OK',
		    Record: created
		});
	    } else {
		sails.log.error("Error creating pricetier: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    update: function(req, res, next) {
	Pricetier.update(req.param('code'), req.params.all()).exec(function(err, updated) {
	    if(!err) {
		res.json({
		    Result: 'OK',
		    Record: updated
		});
	    } else {
		sails.log.error("Error updating pricetier: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    destroy: function(req, res, next) {
	Pricetier.destroy(req.param('code')).exec(function(err, destroyed) {
	    if(!err) {
		res.json({
		    Result: 'OK'
		});
	    } else {
		sails.log.error("Error destroying pricetier: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    }
    
};
