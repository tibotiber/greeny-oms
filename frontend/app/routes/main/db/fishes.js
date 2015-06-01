import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    setupController: function(controller, model) {
	this._super(controller, model);
	controller.set('model', model);
    },

    model: function() {
	return this.store.find('fishproduct', {
	    limit: 50,
	    skip: 0,
	    sort: 'code'
	});
    }

});
