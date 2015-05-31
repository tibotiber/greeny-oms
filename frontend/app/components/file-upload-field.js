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

    filesDidChange: (function() {
	var that = this;
	var uploadUrl = this.get('host')+this.get('parentView.url');
	var files = this.get('files');

	var uploader = CustomUploader.create({
	    url: uploadUrl
	});

	uploader.on('progress', function(e) {
	    that.set('parentView.progress', e.percent);
	});

	var uploadSuccess = function(data) {
	    that.set('parentView.progress', null);
	    that.set('parentView.errorMessage', null);
	    that.set('parentView.successMessage', data.message);
	    that.get('parentView').send('onSuccess');
	};

	var uploadError = function(error) {
	    that.set('parentView.progress', null);
	    that.set('parentView.successMessage', null);
	    that.set('parentView.nbOfAttempts', (that.get('parentView.nbOfAttempts') || 0)+1);
	    that.set('parentView.errorMessage', error);
	};
	
	if (!Ember.isEmpty(files)) {
	    var headers = tokens().addJwt(this, {});
	    uploader.setHeaders(headers); // see custom fix on top
	    var uploadSettings = {};
	    if(this.get('parentView.uploadPath') !== '') {
		uploadSettings.uploadPath = this.get('parentView.uploadPath');
	    }
	    if(this.get('parentView.saveAs') !== '') {
		uploadSettings.saveAs = this.get('parentView.saveAs');
	    }
	    if(this.get('parentView.extension') !== '') {
		uploadSettings.saveAs += '.'+this.get('parentView.extension');
	    }	    
	    uploader.upload(files[0], uploadSettings).then(function(data) {
		if(!data.error) {
		    uploadSuccess(data);
		} else {
		    uploadError(data.error);
		}
	    }, uploadError);
	}
    }).observes('files')

});
