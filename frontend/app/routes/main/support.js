import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import MakeTooltipsMixin from '../../mixins/make-tooltips';

export default Ember.Route.extend(AuthenticatedRouteMixin, MakeTooltipsMixin, {
    setupController: function(controller) {
	this._super();
	// clear a potentially stale error message from previous attempts
	controller.set('errorMessage', null);
	controller.set('successMessage', null);
	controller.set('attempts', 0);
    }
});
