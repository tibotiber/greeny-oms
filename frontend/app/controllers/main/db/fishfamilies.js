import Ember from 'ember';

export default Ember.ArrayController.extend({

    dropdown: function() {
	return _.map(this.get('model.content'), function(family){
	    return {
		value: family.get('id'),
		label: family.get('name')
	    };
	});
    }.property('model.content')
    
});
