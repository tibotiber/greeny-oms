import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(LoginControllerMixin, {
    actions: {
	authenticate: function() {
	    var _this = this;
	    var credentials = this.getProperties('identification', 'password');
	    this.get('session').authenticate('authenticator:sails', credentials).then(null, function(error) {
		// display an error when authentication fails
		var message = (error) ? error.error : "Server did not respond!";
		_this.set('errorMessage', message);
		_this.set('loginAttempts', _this.get('loginAttempts')+1);
	    });
	}
    }
});
