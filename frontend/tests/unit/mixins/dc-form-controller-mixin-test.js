import Ember from 'ember';
import DcFormControllerMixinMixin from '../../../mixins/dc-form-controller-mixin';
import { module, test } from 'qunit';

module('DcFormControllerMixinMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var DcFormControllerMixinObject = Ember.Object.extend(DcFormControllerMixinMixin);
  var subject = DcFormControllerMixinObject.create();
  assert.ok(subject);
});
