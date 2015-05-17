import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import MyFormRouteMixin from '../../mixins/dc-form-route-mixin';
import session from '../../utils/session';

export default Ember.Route.extend(AuthenticatedRouteMixin, MyFormRouteMixin, {

    setupController: function(controller, model) {
	this._super(controller, model);
	controller.set('model', model);
    },

    model: function() {
	return this.store.find('auth', session().user(this).auth.id);
    }
    
});
