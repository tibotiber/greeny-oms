import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import MyFormRouteMixin from '../../mixins/my-form-route-mixin';
import MakeTooltipsRouteMixin from '../../mixins/make-tooltips-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, MakeTooltipsRouteMixin, MyFormRouteMixin, {
    setupController: function(controller, model) {
	this._super(controller, model);
    }
});
