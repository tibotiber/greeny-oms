import Ember from 'ember';
import EmberUploader from 'ember-uploader';
import env from '../config/environment';
import tokens from '../utils/tokens';

/* custom fix
 * see https://github.com/benefitcloud/ember-uploader/issues/35
 * see https://github.com/benefitcloud/ember-uploader/issues/23
 */
var CustomUploader = EmberUploader.Uploader.extend({
    headers: {},
    // Override
    _ajax: function(settings) {
	settings = Ember.merge(settings, this.getProperties('headers'));
	return this._super(settings);
    },
    setHeaders: function(headers) {
	this.set('headers', headers);
    }
});

export default EmberUploader.FileField.extend({

    host: env.APP.emberDataSails.host,
    url: '',
    name: '',
    progress: 'uploadProgress',
    success: 'uploadSuccess',
    error: 'uploadError',

    filesDidChange: (function() {
	var that = this;
	var uploadUrl = this.get('host')+this.get('url');
	var files = this.get('files');

	var uploader = CustomUploader.create({
	    url: uploadUrl
	});

	uploader.on('progress', function(e) {
	    // Handle progress changes
	    that.sendAction('progress', that.get('name'), e.percent);
	});

	var uploadSuccess = function(data) {
	    console.log('upload success');
	    console.log(data);
	    that.sendAction('success', that.get('name'), data);
	};

	var uploadError = function(error) {
	    console.log('upload error');
	    console.log(error);
	    that.sendAction('error', that.get('name'), error);
	};
	
	if (!Ember.isEmpty(files)) {
	    /* NOTA: the next line only works with sailsSocket injected in components 
	     * see https://github.com/huafu/ember-data-sails/issues/17
	     * I modified node_modules/ember-data-sails/addon/initializers/ember-data-sails.js
	     */
	    tokens().addCsrfAndJwt(this, {}, function(err, headers) {
		if(err) return uploadError(err);
		uploader.setHeaders(headers); // see custom fix on top
		uploader.upload(files[0]).then(function(data) {
		    if(!data.error) uploadSuccess(data);
		    else uploadError(data.error);
		}, uploadError);		
	    });
	}
    }).observes('files')

});
