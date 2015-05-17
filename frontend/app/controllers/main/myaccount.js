import Ember from 'ember';
import EmberValidations from 'ember-validations';
import DcFormControllerMixin from '../../mixins/dc-form-controller-mixin';

export default Ember.ObjectController.extend(EmberValidations.Mixin, DcFormControllerMixin, {

    validations: {
	name: {
	    presence: true,
	    format: { with: /^([a-zA-Z\ ])+$/, allowBlank: true, message: 'must be letters and space only'}
	},
	email: {
	    presence: true,
	    format: { with: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/, allowBlank: true, message: 'invalid email address'}
	}
    }

});
