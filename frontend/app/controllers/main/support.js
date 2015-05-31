import Ember from 'ember';
import EmberValidations from 'ember-validations';
import socket from '../../utils/socket';
import MyFormControllerMixin from '../../mixins/my-form-controller-mixin';

export default Ember.Controller.extend(EmberValidations.Mixin, MyFormControllerMixin, {

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
	submit: function() {
	    var that = this;
	    var postData = this.getProperties('type','frequency','subject','description','error');
	    socket().request(this, 'post', '/support/post', postData, function(err, response) {
		if(err) {
		    that.set('errorMessage', response.error);
		    that.set('attempts', that.get('attempts')+1);
		} else {
		    that.set('successMessage', 'Your support ticket has been posted!');
		}
	    });
	}
    }

});
