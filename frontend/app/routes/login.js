import Ember from 'ember';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
    setupController: function(controller) {
	// clear a potentially stale error message from previous login attempts
	controller.set('errorMessage', null);
	controller.set('loginAttempts', 0);
    }
});
