import Ember from 'ember';

export default Ember.Controller.extend({

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
    
    actions: {
	post: function() {
	    var _this = this;
	    var postData = this.getProperties('type','frequency','subject','description','error');
	    
	    // TEMP FIX :: https://github.com/huafu/ember-data-sails/issues/15
	    this.sailsSocket.request('get', '/csrfToken').then(function(response) {
		postData._csrf = response._csrf;
		// TEMP FIX ENDS HERE
		_this.sailsSocket.request('post', '/support/post', postData).then(function(response) {
	            if(response.error) {
			_this.set('errorMessage', response.error);
			_this.set('loginAttempts', _this.get('loginAttempts')+1);
		    } else if(response.redirect) {
			//TODO
			_this.set('errorMessage', 'Needs redirect: '+response.redirect);
			_this.set('attempts', _this.get('attempts')+1);
		    } else {
			_this.set('successMessage', response.success);
		    }
		});
	    });
	}
    }
});
