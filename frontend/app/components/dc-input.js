import Ember from 'ember';
import layout from '../templates/components/dc-input';

export default Ember.Component.extend({

    layout: layout,

    classNameBindings: ['wrapperClass'],

    shouldValidate: false,

    isEdited: false,

    autofocus: true,

    createBindings: function() {
	if(this.get('parentView.valuesStoredIn')) {
	    Ember.defineProperty(this, 'val', Ember.computed.alias('parentView.valuesStoredIn.'+this.get('id')));
	} else {
	    Ember.defineProperty(this, 'val', Ember.computed.alias('parentView.form.'+this.get('id')));
	}
	Ember.defineProperty(this, 'err', Ember.computed.alias('parentView.form.errors.'+this.get('id')));
	Ember.defineProperty(this, 'cancel', Ember.computed.alias('parentView.cancelClicked'));
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
    }.on('init'),

    style: function() {
	return 'margin-top: '+this.get('margin')+'; margin-bottom: '+this.get('margin')+';';
    }.property('margin'),
    
    error: function() {
	return (this.get('shouldValidate')) ? this.get('err') : null;
    }.property('err', 'shouldValidate'),

    cancelClicked: function() {
	this.set('isEdited', false);
    }.observes('cancel').on('init'),

    actions: {
	visited: function() {
	    this.set('shouldValidate', true);
	},
	edit: function() {
	    if(!this.get('locked')) {
		this.set('originalValue', this.get('val'));
		this.set('isEdited', true);
		this.get('parentView').send('fieldIsEdited');
		if(this.get('autofocus')) {
		    var that = this;
		    setTimeout(function(){
			that.$('input').focus();
		    }, 80);
		}
	    }
	},
	cancel: function() {
	    this.set('val', this.get('originalValue'));
	    this.set('isEdited', false);
	    this.get('parentView').send('fieldEditionIsCancelled');
	}
    }
});
