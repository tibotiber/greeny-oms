import Ember from 'ember';
import layout from '../templates/components/file-upload-field';

export default Ember.Component.extend({

    layout: layout,
    url: '/upload',
    uploadPath: '',
    saveAs: '',
    extension: '',

    actions: {
	reset: function() {
	    this.set('progress', null);
	    this.set('errorMessage', null);
	    this.set('successMessage', null);
	}
    }
    
});
