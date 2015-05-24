import Ember from 'ember';
import MakeTooltipsMixin from '../../../mixins/make-tooltips';
import { module, test } from 'qunit';

module('MakeTooltipsMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var MakeTooltipsObject = Ember.Object.extend(MakeTooltipsMixin);
  var subject = MakeTooltipsObject.create();
  assert.ok(subject);
});
