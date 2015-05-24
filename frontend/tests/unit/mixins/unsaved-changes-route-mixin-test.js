import Ember from 'ember';
import UnsavedChangesRouteMixinMixin from '../../../mixins/unsaved-changes-route-mixin';
import { module, test } from 'qunit';

module('UnsavedChangesRouteMixinMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var UnsavedChangesRouteMixinObject = Ember.Object.extend(UnsavedChangesRouteMixinMixin);
  var subject = UnsavedChangesRouteMixinObject.create();
  assert.ok(subject);
});
