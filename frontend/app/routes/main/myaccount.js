import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import UnsavedChangesRouteMixin from '../../mixins/unsaved-changes-route-mixin';
import session from '../../utils/session';

export default Ember.Route.extend(AuthenticatedRouteMixin, UnsavedChangesRouteMixin, {

    setupController: function(controller, account) {
	this._super();
	controller.set('model', account);
    },

    model: function() {
	return this.store.find('user', session().user(this).id);
    }
    
});
