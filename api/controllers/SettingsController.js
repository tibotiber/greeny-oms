/**
 * SettingsController
 *
 * @description :: Server-side logic for managing settings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    edit: function(req, res, next){
	/* Retrieve all settings and render view */
	Settings.find({}).exec(function(err, settings){
	    if(err) return next(err);
	    res.view({
		settings: settings
	    });
	});
    },

    update: function(req, res, next) {
	/* Update all settings */
	var params = JSON.parse(JSON.stringify(req.params.all()));
	delete params.id;
	delete params._csrf;
	async.eachSeries(Object.keys(params), function(key, cb) {
	    if(key == 'newkey' && params.newkey != '') {
		// create new key-value pair
		Settings.create({key: params.newkey, value: params.newvalue}).exec(cb);
	    } else if(key != 'newkey' && key.indexOf('value') == -1 && params[key] != '') {
		// update a key-value pair
		Settings.update({key: key}, {key: params[key], value: params[key+'value']}).exec(cb);
	    } else if(key != 'newkey' && key.indexOf('value') == -1 && params[key] == '') {
		// update a key-value pair
		Settings.destroy({key: key}).exec(cb);
	    }else {
		cb();
	    }
	}, function(err) {
	    if(!err)
		res.redirect('/settings/edit');
	    else
		res.serverError("Error: Could not update settings properly.\n"+err)
	});
    }

};

