import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    setupController: function(controller, model) {
	this._super(controller, model);
	controller.set('model', model);
    },

    model: function(params) {
	if(this.controller) this.controller.set('isLoading', true);
	params.skip = (params.page-1)*params.limit;
	delete params.page;
	return this.store.find('fishproduct', params);
    },

    // setup pagination
    queryParams: {
	page: {
	    refreshModel: true
	}
    },

});
