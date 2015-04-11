import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    setupController: function(controller) {
	// clear a potentially stale error message from previous attempts
	controller.set('errorMessage', null);
	controller.set('successMessage', null);
	controller.set('attempts', 0);
    }
});
