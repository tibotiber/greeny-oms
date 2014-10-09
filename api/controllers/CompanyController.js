/**
 * CompanyController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    picker: function(req, res, next) {
	var search = req.param('search') || '';
	CompanyPickerService.pickCompany({search: search}, function(err, found) {
	    if(!err) {
		var options = _.map(found, function(item) {
		    return {
			value: item.code,
			label: item.name+' ('+item.code+')'
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
		sails.log.error("Error listing companies: \n"+err);
		res.json({
		    Result: 'Error',
		    Message: err
		});
	    }
	});
    }
    
};
