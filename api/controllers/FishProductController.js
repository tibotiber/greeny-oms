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
    }
    
};

