import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    setupController: function(controller, model) {
	this._super(controller, model);
	// model loaded in main route
    }

});
