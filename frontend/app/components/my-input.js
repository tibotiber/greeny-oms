import Ember from 'ember';
import layout from '../templates/components/my-input';

export default Ember.Component.extend({

    layout: layout,

    classNameBindings: ['wrapperClass'],

    shouldValidate: false,

    createBindings: function() {
	Ember.defineProperty(this, 'val', Ember.computed.alias('parentView.form.'+this.get('id')));
	Ember.defineProperty(this, 'err', Ember.computed.alias('parentView.form.errors.'+this.get('id')));
    }.on('init'),
    
    error: function() {
	return (this.get('shouldValidate')) ? this.get('err') : null;
    }.property('err', 'shouldValidate'),

    actions: {
	visited: function() {
	    this.set('shouldValidate', true);
	}
    }
});
