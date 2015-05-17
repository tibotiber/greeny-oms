import Ember from 'ember';

export default Ember.Mixin.create({

    actions: {
	submit: function() {
	    var that = this;
	    var defaultSuccessMessage = this.get('successMessage') || 'Changes saved!';
	    var onSuccess = function() {
		that.set('loading', false);
		that.set('errorMessage', null);
		that.set('successMessage', defaultSuccessMessage);
		setTimeout(function() {
		    that.set('successMessage', null);
		}, 3000);
	    };
	    var onFail = function(error) {
		that.set('loading', false);
		that.set('errorMessage', error);
		that.set('attempts', that.get('attempts')+1);
	    };
	    this.set('loading', true);
	    this.get('model').save().then(onSuccess, onFail);
	}
    }

});
