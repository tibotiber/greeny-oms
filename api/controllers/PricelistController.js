/**
 * PricelistController
 *
 * @description :: Server-side logic for managing pricelists
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    index: function(req, res, next) {
	res.view();
    },

    search: function(req, res, next) {
	// efficiently search in pricelist
	if(req.param('fish').length < 2 || req.param('thirdparty').length < 2) {
	    res.json({
		Result: 'Error',
		Message: "Search fields incomplete or too short."
	    });
	} else {
	    var thirdparty;

	    async.series({
		findCustomer: function(cb){
		    // retrieve customer
		    //TODO search and update thirdparty if found
		    cb(null, null);
		},

		findSupplier: function(cb){
		    // retrieve supplier if no customer
		    if(!thirdparty) {
			//TODO search and update thirdparty if found
			cb(null, null);
		    } else {
			cb(null, null);
		    }
		},

		findPricetier: function(cb){
		    // retrieve pricetier if none of the above
		    if(!thirdparty) {
			Pricetier.findOne({
			    or: [{
				code: {
				    contains: req.param('thirdparty')
				}
			    }, {
				name: {
				    contains: req.param('thirdparty')
				}
			    }]
			}).exec(function(err, found) {
			    if(!err && found) {
				thirdparty = found;
				cb(null, null);
			    } else {
				cb(err, null);
			    }
			});
		    } else {
			cb(null, null);
		    }
		},

		findCurrency: function(cb){
		    // retrieve currency (default SGD)
		    var currency = req.param('currency') || 'SGD';
		    Currency.findOne({code: {contains: currency}}).exec(cb);
		},
		
		skuPicker: function(cb){
		    // retrieve fish variants
		    SkuPickerService.pick(req.param('fish'), true, cb);
		}
	    }, function(err, results) {
		if(!err && thirdparty && results.findCurrency) {
		    async.map(results.skuPicker, function(item, cb) {
			var record = {};
			record.sku = item.sku;
			record.name = item.getInvoiceName();
			record.density20h = item.density20h;
			record.density24h = item.density24h;
			record.density30h = item.density30h;
			record.density36h = item.density36h;
			record.density42h = item.density42h;
			
			// use thirdparty
			record.thirdparty = thirdparty.name;

			// retrieve price for thirdparty
			Pricelist.findOne({
			    sku: item.sku,
			    pricetier: thirdparty.id,
			    currency: results.findCurrency.id
			}).populate('currency').exec(function(err, found) {
			    if(!err && found) {
				record.price = found.price;
				record.currency = found.currency.code;
				record.discount = found.discount;
				record.buyingSize = found.buyingSize;
				cb(null, record);
			    } else if(!err) {
				record.price = '-';
				record.currency = '-';
				record.discount = '-';
				record.buyingSize = null;
				cb(null, record);
			    } else {
				cb("Error finding price:\n"+err);
			    }
			});
		    }, function(err, records) {
			if(!err) {
		 	    res.json({
				Result: 'OK',
				Records: records,
				TotalRecordCount: records.length
			    });   
			} else {
			    sails.log.error(err);
			    res.json({
				Result: 'Error',
				Message: err
			    });
			}
		    });
		} else if(!thirdparty) {
		    res.json({
			Result: 'Error',
			Message: "No thirdparty found."
		    });
		} else if(!results.findCurrency) {
		    res.json({
			Result: 'Error',
			Message: "No currency found."
		    });
		} else {
		    sails.log.error(err);
		    res.json({
			Result: 'Error',
			Message: err
		    });
		}
	    });
	}
    }
    
};
