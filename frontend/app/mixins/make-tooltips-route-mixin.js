import Ember from 'ember';

export default Ember.Mixin.create({

    setupController: function(controller, model) {
	this._super(controller, model);
	// display tipsies
	Ember.run.scheduleOnce('afterRender', function() {
	    $('.hastip').tooltipsy({
		alignTo: 'element',
		offset: [0, 1]
	    });
	});
    }
    
});
