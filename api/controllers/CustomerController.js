/**
 * CustomerController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var _flatten = function(customer, cb) {
    // flatten a customer object for jtable display
    customer.name = customer.company.name;
    customer.country = customer.company.country;
    customer.email = customer.company.email;
    customer.phone = customer.company.phone;
    customer.fax = customer.company.fax;
    customer.website = customer.company.website;
    customer.address = customer.company.address;
    customer.firstShipment = customer.company.firstShipment;
    customer.notes = customer.company.notes;
    cb(null, customer);
};


module.exports = {

    index: function(req, res, next) {
	res.view();
    },

    list: function(req, res, next) {
	var search = req.param('search') || '';
	CompanyPickerService.pickCustomer(search, true, function(err, found) {
	    if(!err) {
		// prepare records
		async.map(found, _flatten, function(err, records) {
		    if(!err) {
			// respond to query
			res.json({
			    Result: 'OK',
			    Records: records
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
		sails.log.error("Error listing customers: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    picker: function(req, res, next) {
	var search = req.param('search') || '';
	CompanyPickerService.pickCustomer(search, true, function(err, found) {
	    if(!err) {
		var options = _.map(found, function(item) {
		    return {
			value: item.code,
			label: item.company.name+' ('+item.code+')'
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
		sails.log.error("Error listing customers: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    create: function(req, res, next) {
	var params = req.params.all();
	params.type = 'customer';
	params.company = req.param('code');
	Company.create(params).exec(function(err, company) {
	    if(!err) {
		Customer.create(params).exec(function(err, customer) {
		    if(!err) {
			// retrieve fully populated record
			CompanyPickerService.pickCustomer(company.name, true, function(err, found) {
			    if(!err) {
				_flatten(found[0], function(err, flatCustomer) {
				    // no error possible in _flatten()
				    res.json({
					Result: 'OK',
					Record: flatCustomer
				    });
				});
			    } else {
				sails.log.error("Error retrieving customer after creation: \n"+err);
				res.json({
				    Result: 'Error',
				    Message: err
				});
			    }
			});
		    } else {
			sails.log.error("Error creating customer: \n"+err);
			res.json({
			    Result: 'Error',
			    Message: err
			});
		    }
		});
	    } else {
		sails.log.error("Error creating company: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    update: function(req, res, next) {
	var params = req.params.all();
	params.company = req.param('code');
	Company.update(params.company, params).exec(function(err, company) {
	    if(!err) {
		Customer.update(params.company, params).exec(function(err, customer) {
		    if(!err) {
			res.json({
			    Result: 'OK',
			    Record: customer
			});
		    } else {
			sails.log.error("Error updating customer: \n"+err);
			res.json({
			    Result: 'Error',
			    Message: err
			});
		    }
		});
	    } else {
		sails.log.error("Error updating company: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    destroy: function(req, res, next) {
	var code = req.param('code');
	Company.destroy(code).exec(function(err, company) {
	    if(!err) {
		Customer.destroy(code).exec(function(err, customer) {
		    if(!err) {
			res.json({
			    Result: 'OK'
			});
		    } else {
			sails.log.error("Error deleting customer: \n"+err);
			res.json({
			    Result: 'Error',
			    Message: err
			});
		    }
		});
	    } else {
		sails.log.error("Error deleting company: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    }

};
