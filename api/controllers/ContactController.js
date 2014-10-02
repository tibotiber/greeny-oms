/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    listByCompany: function(req, res, next) {
	Contact.find({company: req.param('company')}).sort('name').exec(function(err, found) {
	    if(!err) {
		res.json({
		    Result: 'OK',
		    Records: found
		});
	    } else {
		sails.log.error("Error listing contacts:\n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    create: function(req, res, next) {
	var params = req.params.all();
	delete params.id;
	async.parallel({
	    contact: function(cb) {
		Contact.create(params).exec(cb);
	    },
	    onlyOneMain: function(cb) {
		// remove other main contacts if needed
		if(params.main) 
		    Contact.update({main: true}, {main: false}).exec(cb);
		else
		    cb();
	    }
	}, function(err, results) {
	    if(!err) {		
		res.json({
		    Result: 'OK',
		    Record: results.contact
		});
	    } else {
		sails.log.error("Error creating contact:\n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    update: function(req, res, next) {
	var params = req.params.all();
	async.parallel({
	    contact: function(cb) {
		Contact.update(params.id, params).exec(cb);
	    },
	    onlyOneMain: function(cb) {
		// remove other main contacts if needed
		if(params.main) {
		    Contact.update({
			main: true,
			id: {'!': params.id}
		    }, {main: false}).exec(cb);
		} else {
		    cb();
		}
	    }
	}, function(err, results) {
	    if(!err) {
		res.json({
		    Result: 'OK',
		    Record: results.contact
		});
	    } else {
		sails.log.error("Error updating contact:\n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    destroy: function(req, res, next) {
	var params = req.params.all();
	Contact.destroy(params.id).exec(function(err, contact) {
	    if(!err) {
		res.json({
		    Result: 'OK'
		});
	    } else {
		sails.log.error("Error deleting contact:\n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    }    
    
};
