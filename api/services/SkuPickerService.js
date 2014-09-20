// SkuPickerService.js
var ProgressBar = require('progress');
var uu = require('underscore');

module.exports = {

    pick: function(search, populate, cb) {
	// search for variant based on cachedSkuPicker
	// populate is a boolean inidcating whether the results should be populated
	if(!cb) {
	    // shift arguments (populate defaults to false)
	    cb = populate;
	    populate = false;
	}

	// build search
	var ormSearch = {cachedSkuPicker: {contains: []}};
	//TWEAK: while waiting for answer to https://github.com/balderdashy/waterline/issues/648
	var tweak1 = search.split('+').slice(0, 1);
	var tweak2 = search.split('+').slice(1);
	async.eachSeries(tweak1, function(criteria, cb) {
	//async.eachSeries(search.split('+'), function(criteria, cb) {  
	//TWEAK: end
	    ormSearch.cachedSkuPicker.contains.push(criteria);
	    cb();
	}, function(err) {
	    // perform search
	    if(!populate) {
		FishVariant.find(ormSearch).sort('cachedSkuPicker').exec(cb);
	    } else {
		FishVariant.find(ormSearch).sort('cachedSkuPicker').populateAll().exec(function(err, found) {
		    if(!err) {
			//TWEAK: part 2
			var containsAllCriteria = function(item) {
			    var noMatch = uu.reject(tweak2, function(criteria) {
				return item.cachedSkuPicker.toLowerCase().indexOf(criteria.toLowerCase()) > -1;
			    });
			    return noMatch.length === 0;
			};
			found = uu.filter(found, containsAllCriteria);
			//TWEAK: end
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
			cb(err);
		    }
		});
	    }

	});
	
    },

    recalculateCache: function(criteria, cb) {
	// recalculate cachedSkuPicker field for whole database (CRON job)
	if(!cb) {
	    // shift arguments and process whole database
	    cb = criteria;
	    criteria = {};
	    sails.log("Recalculating cached sku picker field for the whole database...");
	}
	
	FishVariant.find(criteria).populateAll().exec(function(err, found) {
	    if(!err) {
		// initialize progress bar
		var bar = new ProgressBar('updating [:bar] :percent :etas', {total: found.length, width: 50, incomplete: ' '});
		// start processing
		async.eachSeries(found, function(item, cb) {
		    // manual n-2 population (until waterline handles it)
		    FishFamily.findOne(item.product.family).exec(function(err, family) {
			if(!err) {
			    item.product.family = family;
			    var cachedSkuPicker = '';
			    cachedSkuPicker += item.getSortedSku();
			    cachedSkuPicker += ' | ' + item.sku;
			    cachedSkuPicker += ' | ' + item.getInvoiceName();
			    cachedSkuPicker += ' | ' + item.product.scientificName;
			    FishVariant.update(item.sku, {cachedSkuPicker: cachedSkuPicker}).exec(function(err) {
				if(err)
				    err = "Error updating variant for "+item.sku+":\n"+err;
				else
				    bar.tick();
				cb(err);
			    });
			} else {
			    cb("Error finding family for "+item.sku+":\n"+err);
			}
		    });
		}, function(err) {
		    if(!err) {
			sails.log("Cached sku picker field has been updated for the whole database.");
			cb();
		    } else {
			cb("Error recalculating cached sku picker field:\n"+err);
		    }
		});
	    } else {
		cb("Error extracting variants from database:\n"+err);
	    }
	});
	
    }

};
