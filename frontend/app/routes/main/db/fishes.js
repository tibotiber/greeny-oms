import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import IgnoreChangesRouteMixin from '../../../mixins/ignore-changes-route-mixin';
import DcFormRouteMixin from '../../../mixins/dc-form-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, DcFormRouteMixin, IgnoreChangesRouteMixin, {

    setupController: function(controller, model) {
	this._super(controller, model);
	controller.set('model', model);
    },

    model: function(params) {
	if(this.controller) {
	    this.controller.set('isLoading', true);
	}
	params.skip = (params.page - 1) * params.limit;
	delete params.page;
	if(_.isUndefined(params.search) || params.search === '') {
	    delete params.search;
	}
	return this.store.find('fishproduct', params);
    },

    // setup pagination
    queryParams: {
	page: {
	    refreshModel: true
	},
	search: {
	    refreshModel: true
	}
    },

});
