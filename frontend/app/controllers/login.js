import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(LoginControllerMixin, {
    actions: {
	// display an error when authentication fails
	authenticate: function() {
	    var _this = this;
	    var credentials = this.getProperties('identification', 'password');
	    this.get('session').authenticate('simple-auth-authenticator:token', credentials).then(null, function(error) {
		var message = error.error;
		_this.set('errorMessage', message);
		_this.set('loginAttempts', _this.get('loginAttempts')+1);
	    });
	}
    }
});
