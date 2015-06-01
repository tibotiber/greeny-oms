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
      this.route('myaccount');
      this.route('mypassword');
      this.route('db', function() {
        this.route('fishes');
        this.route('fishfamilies');
      });
    });

});

export default Router;
