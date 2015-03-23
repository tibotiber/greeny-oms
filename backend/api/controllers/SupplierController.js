/**
 * SupplierController
 *
 * @description :: Server-side logic for managing suppliers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var _flatten = function(supplier, cb) {
    // flatten a supplier object for jtable display
    supplier.name = supplier.company.name;
    supplier.country = supplier.company.country;
    supplier.email = supplier.company.email;
    supplier.phone = supplier.company.phone;
    supplier.fax = supplier.company.fax;
    supplier.website = supplier.company.website;
    supplier.address = supplier.company.address;
    supplier.firstShipment = supplier.company.firstShipment;
    supplier.notes = supplier.company.notes;
    cb(null, supplier);
};


module.exports = {

    index: function(req, res, next) {
	res.view();
    },

    list: function(req, res, next) {
	var search = req.param('search') || '';
	CompanyPickerService.pickSupplier(search, true, function(err, found) {
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
		sails.log.error("Error listing suppliers: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    picker: function(req, res, next) {
	var search = req.param('search') || '';
	CompanyPickerService.pickSupplier(search, true, function(err, found) {
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
		sails.log.error("Error listing suppliers: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },


    create: function(req, res, next) {
	var params = req.params.all();
	params.type = 'supplier';
	params.company = req.param('code');
	Company.create(params).exec(function(err, company) {
	    if(!err) {
		Supplier.create(params).exec(function(err, supplier) {
		    if(!err) {
			// retrieve fully populated record
			CompanyPickerService.pickSupplier(company.name, true, function(err, found) {
			    if(!err) {
				_flatten(found[0], function(err, flatSupplier) {
				    // no error possible in _flatten()
				    res.json({
					Result: 'OK',
					Record: flatSupplier
				    });
				});
			    } else {
				sails.log.error("Error retrieving supplier after creation: \n"+err);
				res.json({
				    Result: 'Error',
				    Message: err
				});
			    }
			});
		    } else {
			sails.log.error("Error creating supplier: \n"+err);
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
		Supplier.update(params.company, params).exec(function(err, supplier) {
		    if(!err) {
			res.json({
			    Result: 'OK',
			    Record: supplier
			});
		    } else {
			sails.log.error("Error updating supplier: \n"+err);
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
		async.parallel([
		    function(cb) {
			Supplier.destroy(code).exec(cb);
		    },
		    function(cb) {
			Contact.destroy({company: code}).exec(cb);
		    }
		], function(err, results) {
		    if(!err) {
			res.json({
			    Result: 'OK'
			});
		    } else {
			sails.log.error("Error deleting supplier or contacts: \n"+err);
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
