import Ember from 'ember';
import layout from '../templates/components/my-form';

export default Ember.Component.extend({

    layout: layout,

    createBindings: function() {
	Ember.defineProperty(this, 'isInvalid', Ember.computed.alias('form.isInvalid'));
	Ember.defineProperty(this, 'errors', Ember.computed.alias('form.errors'));
	Ember.defineProperty(this, 'errorMessage', Ember.computed.alias('form.errorMessage'));
	Ember.defineProperty(this, 'successMessage', Ember.computed.alias('form.successMessage'));
	Ember.defineProperty(this, 'attempts', Ember.computed.alias('form.attempts'));
	Ember.defineProperty(this, 'loading', Ember.computed.alias('form.loading'));
    }.on('init'),

    defaults: function() {
	if(!this.get('buttonLabel')) {
	    this.set('buttonLabel', 'Save');
	}
	if(!this.get('inputWrapperClass')) {
	    this.set('inputWrapperClass', 'col-xs-12');
	}
	if(!this.get('inputClass')) {
	    this.set('inputClass', 'col-sm-8');
	}
	if(!this.get('labelClass')) {
	    this.set('labelClass', 'col-sm-4');
	}
	if(!this.get('submitAction')) {
	    this.set('submitAction', 'submit');
	}
	if(!this.get('margin')) {
	    this.set('margin', '0px');
	}
    }.on('init'),

    actions: {
	submit: function() {
	    this.sendAction('submitAction', this.get('param'));
	}
    }

});
