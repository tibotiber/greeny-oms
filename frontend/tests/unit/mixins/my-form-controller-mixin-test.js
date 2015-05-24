import Ember from 'ember';
import MyFormControllerMixinMixin from '../../../mixins/my-form-controller-mixin';
import { module, test } from 'qunit';

module('MyFormControllerMixinMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var MyFormControllerMixinObject = Ember.Object.extend(MyFormControllerMixinMixin);
  var subject = MyFormControllerMixinObject.create();
  assert.ok(subject);
});
