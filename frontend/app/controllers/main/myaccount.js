import Ember from 'ember';
import EmberValidations from 'ember-validations';
import DcFormControllerMixin from '../../mixins/dc-form-controller-mixin';
import socket from '../../utils/socket';

export default Ember.ObjectController.extend(EmberValidations.Mixin, DcFormControllerMixin, {

    validations: {
	name: {
	    presence: true,
	    format: { with: /^([a-zA-Z\ ])+$/, allowBlank: true, message: 'must be letters and space only'}
	},
	email: {
	    presence: true,
	    format: { with: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/, allowBlank: true, message: 'invalid email address'}
	}
    },

    actions: {
	profilePictureUploaded: function() {
	    var that = this;
	    var data = {
		profile_pic: this.get('model.auth.username')+'.jpg'
	    };
	    socket().request(this, 'post', '/users/update/'+this.get('model.id'), data, function(err, response) {
		if(err) {
		    that.set('errorMessage', err);
		    that.set('attempts', that.get('attempts')+1);
		} else {
		    that.set('successMessage', 'Profile picture updated. Refresh the page to see it!');
		    setTimeout(function() {
			that.set('successMessage', null);
		    }, 5000);
		}
	    });
	}
    }

});
