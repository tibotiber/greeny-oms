import Ember from 'ember';
import DcFormRouteMixinMixin from '../../../mixins/dc-form-route-mixin';
import { module, test } from 'qunit';

module('DcFormRouteMixinMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var DcFormRouteMixinObject = Ember.Object.extend(DcFormRouteMixinMixin);
  var subject = DcFormRouteMixinObject.create();
  assert.ok(subject);
});
