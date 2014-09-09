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
    },

    listFiltered: function(req, res, next) {
	// build search query
	var search = {};
	var criteria = [];
	async.eachSeries(req.param('search').split('+'), function(word, cb) {
	    if(!search.family && word !== '') {
		FishFamily.findOne({name: { contains: word }}).exec(function(err, found) {
		    if(!err && found)
			search.family = found.id;
		    else
			criteria.push(word);
		    cb();
		});
	    } else {
		criteria.push(word);
		cb();
	    }
	}, function(err) {
	    search.or = [
		{ code: { contains: criteria.join(' ') }},
		{ name: { contains: criteria.join(' ') }},
		{ scientificName: { contains: criteria.join(' ') }}
	    ];

	    // search records and count
	    async.parallel({
		records: function(cb) {
		    // search for products
		    FishProduct.find(search).skip(req.param('jtStartIndex')).limit(req.param('jtPageSize')).exec(cb);
		},
		count: function(cb) {
		    // count records
		    FishProduct.count(search).exec(cb);
		}
	    }, function(err, results) {
		if(!err) {
		    // respond to query
		    res.json({
			Result: 'OK',
			Records: results.records,
			TotalRecordCount: results.count
		    });
		} else {
		    sails.log.error("Error listing fish products: \n"+err);
		    res.json({
			Result: 'Error',
			Message: err
		    });
		}
	    });
	});
    },

    create: function(req, res, next) {
	var params = JSON.parse(JSON.stringify(req.params.all()));
	delete params.id;	
	ProductCodingService.getNextFishProductCode(params.family, function(err, code) {
	    if(!err) {
		params.code = code;
		FishProduct.create(params).exec(function(err, created) {
		    if(!err) {
			res.json({
			    Result: 'OK',
			    Record: created
			});
		    } else {
			sails.log.error("Error creating fish product: \n"+err);
			res.json({
			    Result: 'Error',
			    Message: err
			});
		    }
		});
	    } else {
		sails.log.error("Error creating fish product code: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    update: function(req, res, next) {
	FishProduct.update(req.param('code'), req.params.all()).exec(function(err, updated) {
	    if(!err) {
		res.json({
		    Result: 'OK',
		    Record: updated
		});
	    } else {
		sails.log.error("Error updating fish product: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    destroy: function(req, res, next) {
	FishProduct.destroy(req.param('code')).exec(function(err, destroyed) {
	    if(!err) {
		res.json({
		    Result: 'OK'
		});
	    } else {
		sails.log.error("Error destroying fish product: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    }
    
};

