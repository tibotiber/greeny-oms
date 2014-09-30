/**
 * CustomerController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    index: function(req, res, next) {
	res.view();
    },

    list: function(req, res, next) {
	//TODO: replace this by customer picker service
	Customer.find({}).populateAll().exec(function(err, found) {
	    if(!err) {
		// prepare records
		async.map(found, function(item, cb) {
		    item.name = item.company.name;
		    item.country = item.company.country;
		    item.email = item.company.email;
		    item.phone = item.company.phone;
		    item.fax = item.company.fax;
		    item.website = item.company.website;
		    item.address = item.company.address;
		    item.firstShipment = item.company.firstShipment;
		    
		    // manual n-2 population (until waterline handles it)
		    Contact.findOne({
			company: item.code,
			main: true
		    }).exec(function(err, contact) {
			if(!err) {
			    if(contact) item.mainContact = contact.name;
			    cb(null, item);
			} else {
			    cb(err);
			}
		    });
		}, function(err, records) {
		    if(!err) {
			// respond to query
			res.json({
			    Result: 'OK',
			    Records: records
			});
		    } else {
			sails.log.error("Error finding company's main contact: \n"+err);
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

    create: function(req, res, next) {
	var params = req.params.all();
	params.type = 'customer';
	params.company = req.param('code');
	Company.create(params).exec(function(err, company) {
	    if(!err) {
		Customer.create(params).exec(function(err, customer) {
		    if(!err) {
			//TODO: get populated customer via customer picker 
			res.json({
			    Result: 'OK',
			    Record: customer
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
