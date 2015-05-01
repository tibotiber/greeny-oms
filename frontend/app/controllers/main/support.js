import Ember from 'ember';
import EmberValidations from 'ember-validations';
import tokens from '../../utils/tokens';

export default Ember.Controller.extend(EmberValidations.Mixin, {

    typeOptions: [
	{value: 'help request'		, label: "There is something I don't understand, can you help me?"},
	{value: 'permission issue'	, label: "I cannot access a page or request"},
	{value: 'bug'			, label: "Something is not working"},
	{value: 'feature request'	, label: "I would like to suggest some changes"}
    ],
    
    frequencyOptions: [
	{value: 'first time', label: "It is the first time it happens"},
	{value: 'occasional', label: "It happens sometimes but it works usually"},
	{value: 'systematic', label: "It happens all the time"}
    ],

    validations: {
	type: {
	    presence: true
	},
	frequency: {
	    presence: true
	},
	subject: {
	    presence: true,
	    length: { maximum: 50 }
	},
	description: {
	    presence: true
	},
    },
    
    actions: {
	post: function() {
	    var _this = this;
	    var postData = this.getProperties('type','frequency','subject','description','error');
	    tokens().addCsrfAndJwt(this, postData, function(err, postData) {
		if(err) {
		    _this.set('errorMessage', err);
		    _this.set('loginAttempts', _this.get('loginAttempts')+1);
		} else {
		    _this.sailsSocket.request('post', '/support/post', postData).then(function(response) {
			if(response.error) {
			    _this.set('errorMessage', response.error);
			    _this.set('loginAttempts', _this.get('loginAttempts')+1);
			} else {
			    _this.set('successMessage', JSON.stringify(response.success));
			}
		    });
		}
	    });
	}
    }

});
