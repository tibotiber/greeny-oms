import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import MakeTooltipsRouteMixin from '../../mixins/make-tooltips-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, MakeTooltipsRouteMixin, {
    setupController: function(controller) {
	this._super();
	// clear a potentially stale error message from previous attempts
	controller.set('errorMessage', null);
	controller.set('successMessage', null);
	controller.set('attempts', 0);
    }
});
