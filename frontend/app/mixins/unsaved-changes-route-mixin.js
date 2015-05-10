import Ember from 'ember';

export default Ember.Mixin.create({
    
    beforeUnload: function() {
	var that = this;
	Ember.$(window).on('beforeunload', function() {
	    if(that.get('hasUnsavedChanges')) {
		return 'There seem to be unsaved changes in the page...';
	    }
	});
    }.on('init'),

    actions: {

	hasUnsavedChanges: function(bool) {
	    this.set('hasUnsavedChanges', bool);
	},

	willTransition: function(transition) {
	    if (this.get('hasUnsavedChanges') && !confirm("There seem to be unsaved changes in the page...\n\nAre you sure you want to leave this page?")) {
		transition.abort();
	    } else {
		return true;
	    }
	},

	didTransition: function() {
	    this.set('hasUnsavedChanges', false);
	    return true;
	}
	
    }

});
