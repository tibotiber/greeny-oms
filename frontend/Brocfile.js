/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('vendor/localstorage_adapter.js');
app.import('vendor/jasny-bootstrap/css/jasny-bootstrap.css');
app.import('vendor/jasny-bootstrap/js/jasny-bootstrap.js');
app.import('bower_components/font-awesome/css/font-awesome.css');
app.import('bower_components/font-awesome/fonts/fontawesome-webfont.ttf', {
    destDir: 'fonts'
});
app.import('bower_components/font-awesome/fonts/fontawesome-webfont.woff', {
    destDir: 'fonts'
});
app.import('bower_components/font-awesome/fonts/fontawesome-webfont.woff2', {
    destDir: 'fonts'
});
app.import('bower_components/async/lib/async.js');
app.import('bower_components/lodash/lodash.js');


module.exports = app.toTree();
