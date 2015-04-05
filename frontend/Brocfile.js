/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// jquery, bootstrap, ...
app.import('bower_components/jquery/dist/jquery.min.js');
app.import('bower_components/jquery-ui/jquery-ui.min.js');
app.import('bower_components/jquery-ui/themes/base/jquery-ui.min.css');
app.import('bower_components/jqueryui-timepicker-addon/dist/jquery-ui-timepicker-addon.min.js');
app.import('bower_components/jqueryui-timepicker-addon/dist/jquery-ui-timepicker-addon.min.css');
app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');
app.import('bower_components/bootstrap/dist/css/bootstrap.min.css');
app.import('bower_components/jasny-bootstrap/dist/js/jasny-bootstrap.min.js');
app.import('bower_components/jasny-bootstrap/dist/css/jasny-bootstrap.min.css');
app.import('bower_components/font-awesome/css/font-awesome.min.css');
app.import('bower_components/font-awesome/fonts/fontawesome-webfont.ttf', {destDir: 'fonts'});
app.import('bower_components/font-awesome/fonts/fontawesome-webfont.woff', {destDir: 'fonts'});
app.import('bower_components/font-awesome/fonts/fontawesome-webfont.woff2', {destDir: 'fonts'});

// js utils
app.import('bower_components/async/lib/async.js');
app.import('bower_components/lodash/lodash.js');

// ember
app.import('vendor/localstorage_adapter.js');


module.exports = app.toTree();
