// CompanyPickerService.js
module.exports = {
    
    pickCustomer: function(search, populate, cb) {
	// search for customers based on code or name
	// populate is a boolean indicating whether the results should be populated
	if(!cb) {
	    // shift arguments (populate defaults to false)
	    cb = populate;
	    populate = false;
	}

	var options = {
	    search: search,
	    type: 'customer'
	};
	
	this.pickCompany(options, function(err, found) {
	    if(!err) {
		async.map(found, function(company, cb) {
		    var query = Customer.findOne(company.code);
		    if(populate) query = query.populateAll();
		    query.exec(function(err, customer) {
			if(!err) {
			    // manual population of main contact
			    Contact.findOne({
				company: customer.code,
				main: true
			    }).exec(function(err, contact) {
				if(!err) {
				    if(contact) customer.mainContact = contact.name;
				    cb(null, customer);
				} else {
				    cb(err);
				}
			    });
			} else {
			    cb(err);
			}
		    });
		}, cb);
	    } else {
		cb(err);
	    }
	});
    },

    pickSupplier: function(search, populate, cb) {
	// search for suppliers based on code or name
	// populate is a boolean indicating whether the results should be populated
	if(!cb) {
	    // shift arguments (populate defaults to false)
	    cb = populate;
	    populate = false;
	}

	var options = {
	    search: search,
	    type: 'supplier'
	};

	this.pickCompany(options, function(err, found) {
	    if(!err) {
		async.map(found, function(company, cb) {
		    var query = Supplier.findOne(company.code);
		    if(populate) query = query.populateAll();
		    query.exec(function(err, supplier) {
			if(!err) {
			    // manual population of main contact
			    Contact.findOne({
				company: supplier.code,
				main: true
			    }).exec(function(err, contact) {
				if(!err) {
				    if(contact) supplier.mainContact = contact.name;
				    cb(null, supplier);
				} else {
				    cb(err);
				}
			    });
			} else {
			    cb(err);
			}
		    });
		}, cb);
	    } else {
		cb(err);
	    }
	});
    },

    pickCompany: function(options, cb) {
	var criteria = {or : [
	    {code: {contains: options.search}},
	    {name: {contains: options.search}},
	    {country: {contains: options.search}}
	]};
	if(options.type) criteria.type = options.type;
	Company.find(criteria).sort('name').exec(cb);	
    }

};
