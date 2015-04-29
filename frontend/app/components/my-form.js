import Ember from 'ember';
import layout from '../templates/components/my-form';

export default Ember.Component.extend({

    layout: layout,

    createBindings: function() {
	Ember.defineProperty(this, 'isInvalid', Ember.computed.alias('form.isInvalid'));
	Ember.defineProperty(this, 'errors', Ember.computed.alias('form.errors'));
    }.on('init'),

    actions: {
	post: function() {
	    this.sendAction('action', this.get('param'));
	}
    }

});
