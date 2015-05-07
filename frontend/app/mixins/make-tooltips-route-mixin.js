import Ember from 'ember';

export default Ember.Mixin.create({
    setupController : function(){
	this._super();
	Ember.run.scheduleOnce('afterRender', function() {
	    $('.hastip').tooltipsy({
		alignTo: 'element',
		offset: [0, 1]
	    });
	});
    }
});
