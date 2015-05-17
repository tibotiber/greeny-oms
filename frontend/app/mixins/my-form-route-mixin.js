import Ember from 'ember';

export default Ember.Mixin.create({

    setupController: function(controller, model) {
	this._super(controller, model);
	// clear a potentially stale error message from previous attempts
	controller.set('errorMessage', null);
	controller.set('successMessage', null);
	controller.set('attempts', 0);
    }
    
});
