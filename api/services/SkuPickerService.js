// SkuPickerService.js
var ProgressBar = require('progress');


module.exports = {

    pick: function(options, populate, cb) {
	// search for variant based on cachedSkuPicker
	// populate is a boolean indicating whether the results should be populated
	if(!cb) {
	    // shift arguments (populate defaults to false)
	    cb = populate;
	    populate = false;
	}

	// build search
	var ormSearch = {cachedSkuPicker: {contains: []}};
	//TWEAK: while waiting for answer to https://github.com/balderdashy/waterline/issues/648
	var tweak1 = options.search.split('+').slice(0, 1);
	var tweak2 = options.search.split('+').slice(1);
	async.eachSeries(tweak1, function(criteria, cb) {
	//async.eachSeries(options.search.split('+'), function(criteria, cb) {  
	//TWEAK: end
	    ormSearch.cachedSkuPicker.contains.push(criteria);
	    cb();
	}, function(err) {
	    async.parallel({
		count: function(cb) {
		    // count total number of records
		    FishVariant.count(ormSearch).exec(cb);
		},
		records: function(cb) {
		    // perform search
		    var query = FishVariant.find(ormSearch).sort('cachedSkuPicker');
		    if(options.skip) query = query.skip(options.skip);
		    if(options.limit) query = query.limit(options.limit);
		    if(populate) query = query.populateAll();
		    
		    query.exec(function(err, found) {
			if(!err) {
			    //TWEAK: part 2
			    var containsAllCriteria = function(item) {
				var noMatch = _.reject(tweak2, function(criteria) {
				    return item.cachedSkuPicker.toLowerCase().indexOf(criteria.toLowerCase()) > -1;
				});
				return noMatch.length === 0;
			    };
			    found = _.filter(found, containsAllCriteria);
			    //TWEAK: end
			    if(populate) {
				async.map(found, function(item, cb) {
				    // manual n-2 population (until waterline handles it)
				    FishFamily.findOne(item.product.family).exec(function(err, family) {
					if(!err) {
					    item.product.family = family;
					    cb(null, item);
					} else {
					    cb(err);
					}
				    });
				}, cb);
			    } else {
				cb(null, found);
			    }
			} else {
			    cb(err);
			}
		    });
		}
	    }, function(err, results) {
		cb(err, results.records, results.count);
	    });

	});
	
    },

    pickProducts: function(options, populate, cb) {
	// search for product based on cachedSkuPicker
	// populate is a boolean indicating whether the results should be populated
	if(!cb) {
	    // shift arguments (populate defaults to false)
	    cb = populate;
	    populate = false;
	}

	// build search
	var ormSearch = {cachedSkuPicker: {contains: []}};
	//TWEAK: while waiting for answer to https://github.com/balderdashy/waterline/issues/648
	var tweak1 = options.search.split('+').slice(0, 1);
	var tweak2 = options.search.split('+').slice(1);
	async.eachSeries(tweak1, function(criteria, cb) {
	//async.eachSeries(options.search.split('+'), function(criteria, cb) {  
	//TWEAK: end
	    ormSearch.cachedSkuPicker.contains.push(criteria);
	    cb();
	}, function(err) {
	    async.parallel({
		count: function(cb) {
		    // count total number of records
		    FishProduct.count(ormSearch).exec(cb);
		},
		records: function(cb) {
		    // perform search
		    var query = FishProduct.find(ormSearch).sort('cachedSkuPicker');
		    if(options.skip) query = query.skip(options.skip);
		    if(options.limit) query = query.limit(options.limit);
		    if(populate) query = query.populateAll();
		    
		    query.exec(function(err, found) {
			if(!err) {
			    //TWEAK: part 2
			    var containsAllCriteria = function(item) {
				var noMatch = _.reject(tweak2, function(criteria) {
				    return item.cachedSkuPicker.toLowerCase().indexOf(criteria.toLowerCase()) > -1;
				});
				return noMatch.length === 0;
			    };
			    found = _.filter(found, containsAllCriteria);
			    //TWEAK: end
			    cb(null, found);
			} else {
			    cb(err);
			}
		    });
		}
	    }, function(err, results) {
		cb(err, results.records, results.count);
	    });

	});
	
    }
    
};
