import Ember from 'ember';
import layout from '../templates/components/dc-input';

export default Ember.Component.extend({

    layout: layout,

    classNameBindings: ['wrapperClass'],

    shouldValidate: false,

    hasChanges: false,

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
    }.on('init'),
    
    error: function() {
	return (this.get('shouldValidate')) ? this.get('err') : null;
    }.property('err', 'shouldValidate'),

    actions: {
	visited: function() {
	    this.set('shouldValidate', true);
	},
	edit: function() {
	    if(!this.get('locked')) {
		this.set('hasChanges', true);
		this.get('parentView').send('hasChanges');
	    }
	}
    }
});
