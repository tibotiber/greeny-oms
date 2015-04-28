import Ember from 'ember';

export function initialize(/*container, application*/) {
    Ember.Select.reopen({
	didInsertElement: function() {
	    if(this.prompt) {
		this.$('option:first').attr('disabled', true);
	    }
	}
    });
}

export default {
    name: 'ember-select-disable-prompt',
    initialize: initialize
};
