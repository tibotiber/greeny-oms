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

	this._pickCompany(search, function(err, found) {
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

    _pickCompany: function(search, cb) {
	Company.find({
	    or : [
		{code: {contains: search}},
		{name: {contains: search}},
		{country: {contains: search}}
	    ]
	}).sort('name').exec(cb);	
    }

};
