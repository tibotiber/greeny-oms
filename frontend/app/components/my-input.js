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
    
    defaults: function() {
	if(!this.get('label')) {
	    this.set('label', Ember.String.capitalize(this.get('id')));
	}
	if(!this.get('nolabel')) {
	    this.set('autolabel', true);
	}
	if(!this.get('wrapperClass')) {
	    this.set('wrapperClass', this.get('parentView.inputWrapperClass'));
	}
	if(!this.get('inputClass')) {
	    this.set('inputClass', this.get('parentView.inputClass'));
	}
	if(!this.get('labelClass')) {
	    this.set('labelClass', this.get('parentView.labelClass'));
	}
	if(!this.get('margin')) {
	    this.set('margin', this.get('parentView.margin'));
	}
	if(!this.get('type')) {
	    this.set('type', 'text');
	}
    }.on('init'),

    style: function() {
	return 'margin-top: '+this.get('margin')+'; margin-bottom: '+this.get('margin')+';';
    }.property('margin'),
    
    error: function() {
	return (this.get('shouldValidate')) ? this.get('err') : null;
    }.property('err', 'shouldValidate'),

    actions: {
	visited: function() {
	    this.set('shouldValidate', true);
	}
    }
});
