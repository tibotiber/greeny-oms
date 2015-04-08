import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
    this.route('login');

    this.resource('main', {path: '/'}, function(){
	this.resource('user', function() {});
	this.route('support');
    });

});

export default Router;
