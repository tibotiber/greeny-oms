import Ember from 'ember';

export default Ember.Mixin.create({
    
    beforeUnload: function() {
	var that = this;
	Ember.$(window).on('beforeunload', function() {
	    if(that.get('hasChanges')) {
		return 'There seem to be unsaved changes in the page...';
	    }
	});
    }.on('init'),

    actions: {

	hasChanges: function() {
	    this.set('hasChanges', true);
	},

	willTransition: function(transition) {
	    if (this.get('hasChanges') && !confirm("There seem to be unsaved changes in the page...\n\nAre you sure you want to leave this page?")) {
		transition.abort();
	    } else {
		return true;
	    }
	},

	didTransition: function() {
	    this.set('hasChanges', false);
	    return true;
	}
	
    }

});
