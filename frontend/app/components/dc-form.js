import Ember from 'ember';
import layout from '../templates/components/dc-form';

export default Ember.Component.extend({

    layout: layout,

    nbOfFieldsEdited: 0,

    isEdited: function() {
	return this.get('nbOfFieldsEdited') > 0;
    }.property('nbOfFieldsEdited'),

    protectUnsavedChanges: function() {
	this.sendAction('bubbleChanges', this.get('isEdited'));
    }.observes('isEdited').on('init'),
    
    bubbleChanges: "hasUnsavedChanges",
    
    createBindings: function() {
	Ember.defineProperty(this, 'isInvalid', Ember.computed.alias('form.isInvalid'));
	Ember.defineProperty(this, 'errors', Ember.computed.alias('form.errors'));
    }.on('init'),

    defaults: function() {
	if(!this.get('buttonLabel')) {
	    this.set('buttonLabel', 'Save Changes');
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
    }.on('init'),

    actions: {
	post: function() {
	    this.sendAction('action', this.get('param'));
	},
	fieldIsEdited: function() {
	    this.set('nbOfFieldsEdited', this.get('nbOfFieldsEdited') + 1);
	},
	fieldEditionIsCancelled: function() {
	    this.set('nbOfFieldsEdited', this.get('nbOfFieldsEdited') - 1);
	}
    }

});
