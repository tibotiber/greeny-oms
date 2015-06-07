import Ember from 'ember';
import layout from '../templates/components/dc-form';

export default Ember.Component.extend({

    layout: layout,

    nbOfFieldsEdited: 0,

    cancelClicked: 0,

    cancelRequested: false,

    isEdited: function() {
	return this.get('nbOfFieldsEdited') > 0;
    }.property('nbOfFieldsEdited'),

    protectUnsavedChanges: function() {
	this.sendAction('bubbleChanges', this.get('isEdited'));
    }.observes('isEdited').on('init'),

    clearChanges: function() {
	this.set('nbOfFieldsEdited', 0);
	this.set('cancelClicked', this.get('cancelClicked') + 1);
	this.set('cancelRequested', false);
	this.set('changesSaved', false);
    }.observes('changesSaved').on('init'),
    
    bubbleChanges: "hasUnsavedChanges",
    
    createBindings: function() {
	Ember.defineProperty(this, 'isInvalid', Ember.computed.alias('form.isInvalid'));
	Ember.defineProperty(this, 'errors', Ember.computed.alias('form.errors'));
	Ember.defineProperty(this, 'errorMessage', Ember.computed.alias('form.errorMessage'));
	Ember.defineProperty(this, 'successMessage', Ember.computed.alias('form.successMessage'));
	Ember.defineProperty(this, 'attempts', Ember.computed.alias('form.attempts'));
	Ember.defineProperty(this, 'changesSaved', Ember.computed.alias('form.changesSaved'));
	Ember.defineProperty(this, 'loading', Ember.computed.alias('form.loading'));
    }.on('init'),

    defaults: function() {
	if(!this.get('buttonLabel')) {
	    this.set('buttonLabel', 'Save Changes');
	}
	if(!this.get('cancelLabel')) {
	    this.set('cancelLabel', 'Cancel Changes');
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
	if(!this.get('cancel')) {
	    this.set('cancel', 'cancel');
	}
	if(!this.get('margin')) {
	    this.set('margin', '0px');
	}
    }.on('init'),

    actions: {
	submit: function() {
	    this.sendAction('submitAction', this.get('param'));
	},
	fieldIsEdited: function() {
	    this.set('nbOfFieldsEdited', this.get('nbOfFieldsEdited') + 1);
	},
	fieldEditionIsCancelled: function() {
	    this.set('nbOfFieldsEdited', this.get('nbOfFieldsEdited') - 1);
	},
	cancel: function() {
	    this.sendAction('cancel');
	    this.clearChanges();
	},
	requestCancel: function() {
	    this.set('cancelRequested', true);
	    var that = this;
	    setTimeout(function(){
		that.set('cancelRequested', false);
	    }, 5000);
	}
    }

});
