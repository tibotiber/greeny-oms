import Ember from 'ember';
import layout from '../templates/components/todo-edit';

export default Ember.TextField.extend({
    didInsertElement: function() {
	this.$().focus();
    }
});
