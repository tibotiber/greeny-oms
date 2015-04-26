import Ember from 'ember';
import layout from '../templates/components/my-input';

export default Ember.Component.extend({

    layout: layout,

    classNameBindings: ['wrapperClass'],

    shouldValidate: false,

    error: function() {
	return (this.get('shouldValidate')) ? this.get('err') : null;
    }.property('err', 'shouldValidate'),

    actions: {
	visited: function() {
	    this.set('shouldValidate', true);
	}
    }
});
