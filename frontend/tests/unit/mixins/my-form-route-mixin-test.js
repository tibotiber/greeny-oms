import Ember from 'ember';
import MyFormRouteMixinMixin from '../../../mixins/my-form-route-mixin';
import { module, test } from 'qunit';

module('MyFormRouteMixinMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var MyFormRouteMixinObject = Ember.Object.extend(MyFormRouteMixinMixin);
  var subject = MyFormRouteMixinObject.create();
  assert.ok(subject);
});
