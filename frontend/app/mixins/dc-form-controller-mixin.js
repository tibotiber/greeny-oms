import Ember from 'ember';

export default Ember.Mixin.create({

    actions: {
	submit: function() {
	    var that = this;
	    var defaultSuccessMessage = this.get('successMessage') || 'Changes saved!';
	    var onSuccess = function() {
		that.set('loading', false);
		that.set('changesSaved', true);
		that.set('errorMessage', null);
		that.set('successMessage', defaultSuccessMessage);
		setTimeout(function() {
		    that.set('successMessage', null);
		}, 3000);
		// allow success extension
		if(that.get('afterSuccess')) {
		    that.get('afterSuccess')(that);
		}
	    };
	    var onFail = function(error) {
		that.set('loading', false);
		that.set('errorMessage', error);
		that.set('attempts', that.get('attempts')+1);
		// allow error extension
		if(that.get('afterError')) {
		    that.get('afterError')(that, error);
		}
	    };
	    this.set('loading', true);
	    this.get('model').save().then(onSuccess, onFail);
	},
	cancel: function() {
	    var model = this.get('model');
	    if(model.content) {
		// array controller
		model.content.forEach(function(item) {
		    item.rollback();
		});
	    } else {
		// object controller
		model.rollback();
	    }
	}
    }

});
