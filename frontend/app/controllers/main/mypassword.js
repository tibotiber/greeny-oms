import Ember from 'ember';
import EmberValidations from 'ember-validations';
import MyFormControllerMixin from '../../mixins/my-form-controller-mixin';

export default Ember.ObjectController.extend(EmberValidations.Mixin, MyFormControllerMixin, {

    validations: {
	password: {
	    presence: true,
	    length: { minimum: 8, allowBlank: true },
	    confirmation: { message: 'password confirmation does not match' }
	}
    }

});
