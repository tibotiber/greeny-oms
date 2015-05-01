import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import session from '../../utils/session';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function() {
	return this.store.find('user', session().user(this).id);
    }
});
