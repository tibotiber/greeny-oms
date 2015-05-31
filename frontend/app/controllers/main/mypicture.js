import Ember from 'ember';

export default Ember.Controller.extend({

    actions: {
	uploadProgress: function(uploadName, percent) {
	    this.set(uploadName+'UploadProgress', percent);
	},
	uploadSuccess: function(uploadName, data) {
	    this.set(uploadName+'UploadProgress', null);
	    this.set(uploadName+'UploadError', null);
	    this.set(uploadName+'UploadSuccess', data);
	},
	uploadError: function(uploadName, error) {
	    this.set(uploadName+'UploadProgress', null);
	    this.set(uploadName+'UploadError', error);
	    this.set(uploadName+'UploadAttempts', (this.get(uploadName+'UploadAttempts') || 0)+1);
	}	
    }
    
});
