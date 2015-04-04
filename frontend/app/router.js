import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
    this.route('login');

    this.resource('todos', function() {
	this.route('active');
	this.route('completed');
    });
    this.resource('user', function() {});
});

export default Router;
