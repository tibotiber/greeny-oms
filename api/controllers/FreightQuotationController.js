/**
 * FreightQuotationController
 *
 * @description :: Server-side logic for managing freightquotations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    
    index: function(req, res, next) {
	res.view('freight/index');
    },

    list: function(req, res, next) {
	FreightQuotation.find({}).sort('company').exec(function(err, found) {
	    if(!err) {
		res.json({
		    Result: 'OK',
		    Records: found
		});
	    } else {
		sails.log.error("Error listing freight quotations:\n"+err);
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
	FreightQuotation.create(params).exec(function(err, created) {
	    if(!err) {
		if(created['default']) {
		    FreightQuotation.update({
			company: created.company,
			id: {'!': created.id},
			'default': true
		    }, {'default': false}).exec(function(err) {
			if(!err) {
			    res.json({
				Result: 'OK',
				Record: created
			    });
			} else {
			    sails.log.error("Error creating freight quotation:\n"+err);
			    res.json({
				Result: 'Error',
				Message: err
			    });
			}
		    });
		} else {
		    res.json({
			Result: 'OK',
			Record: created
		    });
		}
	    } else {
		sails.log.error("Error creating freight quotation:\n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    update: function(req, res, next) {
	var params = req.params.all();
	FreightQuotation.update(params.id, params).exec(function(err, updated) {
	    if(!err) {
		if(updated[0]['default']) {
		    FreightQuotation.update({
			company: updated[0].company,
			id: {'!': updated[0].id},
			'default': true
		    }, {'default': false}).exec(function(err) {
			if(!err) {
			    res.json({
				Result: 'OK',
				Record: updated
			    });
			} else {
			    sails.log.error("Error updating freight quotation:\n"+err);
			    res.json({
				Result: 'Error',
				Message: err
			    });
			}
		    });
		} else {
		    res.json({
			Result: 'OK',
			Record: updated
		    });
		}
	    } else {
		sails.log.error("Error updating freight quotation:\n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    },

    destroy: function(req, res, next) {
	var params = req.params.all();
	FreightQuotation.destroy(params.id).exec(function(err, destroyed) {
	    if(!err) {
		FreightRoute.destroy({quotation: params.id}).exec(function(err, destroyed) {
		    if(!err) {
			res.json({
			    Result: 'OK'
			});
		    } else {
			sails.log.error("Error deleting freight routes: \n"+err);
			res.json({
			    Result: 'Error',
			    Message: err
			});
		    }
		});
	    } else {
		sails.log.error("Error deleting freight quotation:\n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    }    
    
};
