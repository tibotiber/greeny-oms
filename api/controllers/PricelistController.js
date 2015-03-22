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
	    var criteria = {
		or: [
		    {code: {contains: req.param('thirdparty')}},
		    {name: {contains: req.param('thirdparty')}}
		]
	    };
	    async.series({
		thirdparty: function(cb){
		    // retrieve customer or supplier
		    Company.findOne(criteria).exec(function(err, found) {
			if(!err && found) {
			    cb(null, found);
			} else if(!err) {
			    // no company found, search for pricetier
			    Pricetier.findOne(criteria).exec(cb);
			} else {
			    cb(err);
			}
		    });
		},

		currency: function(cb){
		    // retrieve currency (default SGD)
		    var currency = req.param('currency') || 'SGD';
		    Currency.findOne({code: {contains: currency}}).exec(cb);
		},
		
		skuPicker: function(cb){
		    // retrieve fish variants
		    SkuPickerService.pick({search: req.param('fish')}, true, function(err, records, count) {
			cb(err, records);
		    });
		}
	    }, function(err, results) {
		if(!err && results.thirdparty && results.currency) {
		    async.map(results.skuPicker, function(item, cb) {
			var record = {};
			record.sku = item.sku;
			record.name = item.getInvoiceName();

			// fill density according to customer default route
			var fillAllDensities = function() {
			    record.density20h = item.density20h;
			    record.density24h = item.density24h;
			    record.density30h = item.density30h;
			    record.density36h = item.density36h;
			    record.density42h = item.density42h;
			};
			var fillNoDensity = function() {
			    record.density20h = '-';
			    record.density24h = '-';
			    record.density30h = '-';
			    record.density36h = '-';
			    record.density42h = '-';
			};
			if(results.thirdparty.type === 'customer') {
			    // find duration of default route
			    FreightQuotation.findOne({company: results.thirdparty.code, 'default': true}).exec(function(err, defaultFreight) {
				if(!err && defaultFreight) {
				    FreightRoute.findOne({quotation: defaultFreight.id, 'default': true}).exec(function(err, defaultRoute) {
					if(!err && defaultRoute) {
					    var duration = defaultRoute.door_to_door;
					    switch (true) {
					    case (duration <= 20 ):
						fillNoDensity();
						record.density20h = item.density20h;
						break;
					    case (duration <= 24 ):
						fillNoDensity();
						record.density24h = item.density24h;
						break;
					    case (duration <= 30 ):
						fillNoDensity();
						record.density30h = item.density30h;
						break;
					    case (duration <= 36 ):
						fillNoDensity();
						record.density36h = item.density36h;
						break;
					    case (duration <= 42 ):
						fillNoDensity();
						record.density42h = item.density42h;
						break;
					    default:
						break;
					    }
					} else {
					    fillAllDensities();
					}
				    });
				} else {
				    fillAllDensities();
				}
			    });
			} else {
			    fillAllDensities();
			}
			
			// use thirdparty
			record.thirdparty = results.thirdparty.name;

			// prepare utility methods
			var copyPrice = function(foundItem, returnedRecord) {
			    returnedRecord.price = foundItem.price;
			    returnedRecord.currency = foundItem.currency;
			    returnedRecord.discount = foundItem.discount;
			    returnedRecord.buyingSize = foundItem.buyingSize;
			};
			var noPrice = function(returnedRecord) {
			    returnedRecord.price = '-';
			    returnedRecord.currency = '-';
			    returnedRecord.discount = '-';
			    returnedRecord.buyingSize = null;
			};
			
			// retrieve price for thirdparty
			Pricelist.findOne({
			    sku: item.sku,
			    or: [
				{pricetier : results.thirdparty.code},
				{customer  : results.thirdparty.code},
				{supplier  : results.thirdparty.code}
			    ],
			    currency: results.currency.code
			}).exec(function(err, found) {
			    if(!err && found) {
				copyPrice(found, record);
				cb(null, record);
			    } else if(!err) {
				// no price found
				// fall back to pricetier for customers
				if(results.thirdparty.type === 'customer') {
				    // find pricetier
				    Customer.findOne(results.thirdparty.code).populate('pricetier').exec(function(err, customer) {
					// search price for price tier
					Pricelist.findOne({
					    sku: item.sku,
					    pricetier: customer.pricetier.code,
					    currency: results.currency.code
					}).exec(function(err, found) {
					    if(!err && found) {
						record.thirdparty = customer.pricetier.name;
						copyPrice(found, record);
						cb(null, record);
					    } else if(!err) {
						noPrice(record);
						cb(null, record);
					    } else {
						cb(err);
					    }
					});
				    });
				} else {
				    noPrice(record);
				    cb(null, record);
				}
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
		} else if(!results.thirdparty) {
		    res.json({
			Result: 'Error',
			Message: "No thirdparty found."
		    });
		} else if(!results.currency) {
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
    },

    edit: function(req, res, next) {
	res.view();	
    },

    list: function(req, res, next) {
	// sku picker with pricetiers price retrieval
	if(req.param('fish').length < 2) {
	    res.json({
		Result: 'Error',
		Message: "Search field too short."
	    });
	} else {
	    SkuPickerService.pick({
		search: req.param('fish'),
		skip   : req.param('jtStartIndex'),
		limit  : req.param('jtPageSize')
	    }, true, function(err, records, count) {
		if(!err) {
		    async.map(records, function(item, cb) {
			var record = {};
			record.sku = item.sku;
			record.name = item.getInvoiceName();
			record.density20h = item.density20h;
			record.density24h = item.density24h;
			record.density30h = item.density30h;
			record.density36h = item.density36h;
			record.density42h = item.density42h;
			
			// retrieve prices
			async.parallel({
			    wls: function(cb) {
				Pricelist.findOne({
				    sku: item.sku,
				    pricetier: 'WLS',
				    currency: 'SGD'
				}).exec(cb);
			    },
			    usd: function(cb) {
				Pricelist.findOne({
				    sku: item.sku,
				    pricetier: 'WLS',
				    currency: 'USD'
				}).exec(cb);
			    },
			    rtl: function(cb) {
				Pricelist.findOne({
				    sku: item.sku,
				    pricetier: 'RTL',
				    currency: 'SGD'
				}).exec(cb);
			    }
			}, function(err, results) {
			    if(!err) {
				if(results.wls)
				    record.wholesale = results.wls.price;
				else
				    record.wholesale = '-';
				if(results.usd)
				    record.wholesaleUSD = results.usd.price;
				else
				    record.wholesaleUSD = '-';
				if(results.rtl)
				    record.retail = results.rtl.price;
				else
				    record.retail = '-';
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
				TotalRecordCount: count
			    });   
			} else {
			    sails.log.error(err);
			    res.json({
				Result: 'Error',
				Message: err
			    });
			}
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
    },

    listByVariant: function(req, res, next) {
	// list all prices for one variant
	Pricelist.find({sku: req.param('sku')}).populate('pricetier').populate('supplier').populate('customer').exec(function(err, found) {
	    if(!err) {
		async.map(found, function(item, cb) {
		    if(item.pricetier) {
			item.type = 'Pricetier';
			item.thirdparty = item.pricetier.name;
			item.thirdpartyCode = item.pricetier.code;
			cb(null, item);
		    } else if(item.supplier) {
			item.type = 'Supplier';
			item.thirdpartyCode = item.supplier.code;
			Company.findOne(item.supplier.code).exec(function(err, found) {
			    if(!err && found) {
				item.thirdparty = found.name;
				cb(null, item);
			    } else if(!err) {
				cb('Error: Could not find company name.');
			    } else {
				cb(err);
			    }
			});
		    } else if(item.customer) {
			item.type = 'Customer';
			item.thirdpartyCode = item.customer.code;
			Company.findOne(item.customer.code).exec(function(err, found) {
			    if(!err && found) {
				item.thirdparty = found.name;
				cb(null, item);
			    } else if(!err) {
				cb('Error: Could not find company name.');
			    } else {
				cb(err);
			    }
			});
		    }
		}, function(err, records) {
		    if(!err) {
			res.json({
			    Result: 'OK',
			    Records: records
			});
		    } else {
			res.json({
			    Result: 'Error',
			    Message: err
			});
		    }
		});
	    } else {
		sails.log.error("Error listing fish prices: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    create: function(req, res, next) {
	var params = JSON.parse(JSON.stringify(req.params.all()));
	Pricelist.create(params).exec(function(err, created) {
	    if(!err) {
		res.json({
		    Result: 'OK',
		    Record: created
		});
	    } else {
		sails.log.error("Error creating price: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    update: function(req, res, next) {
	var params = JSON.parse(JSON.stringify(req.params.all()));
	Pricelist.update(params.id, params).exec(function(err, updated) {
	    if(!err) {
		res.json({
		    Result: 'OK',
		    Record: updated
		});
	    } else {
		sails.log.error("Error updating price: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    destroy: function(req, res, next) {
	var params = JSON.parse(JSON.stringify(req.params.all()));
	Pricelist.destroy(params.id).exec(function(err) {
	    if(!err) {
		res.json({
		    Result: 'OK'
		});
	    } else {
		sails.log.error("Error deleting price: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    }
    
};
