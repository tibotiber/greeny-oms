import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    setupController: function(controller, model) {
	var that = this;
	this._super(controller, model);
	// load fishfamilies controller for dependencies
	this.store.find('fishfamily').then(function(families) {
	    that.controllerFor('main/db/fishfamilies').set('model',families);
	});
    },

    
    
});
