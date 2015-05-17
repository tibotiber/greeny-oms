import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import UnsavedChangesRouteMixin from '../../mixins/unsaved-changes-route-mixin';
import DcFormRouteMixin from '../../mixins/dc-form-route-mixin';
import session from '../../utils/session';

export default Ember.Route.extend(AuthenticatedRouteMixin, UnsavedChangesRouteMixin, DcFormRouteMixin, {

    setupController: function(controller, model) {
	this._super(controller, model);
	controller.set('model', model);
    },

    model: function() {
	return this.store.find('user', session().user(this).id);
    }
    
});
