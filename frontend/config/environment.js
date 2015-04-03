/* jshint node: true */

module.exports = function(environment) {
    var ENV = {
	modulePrefix: 'ember-test',
	environment: environment,
	baseURL: '/',
	locationType: 'auto',
	EmberENV: {
	    FEATURES: {
		// Here you can enable experimental features on an ember canary build
		// e.g. 'with-controller': true
	    }
	},
	APP: {
	    // Here you can pass flags/options to your application instance
	    // when it is created
	},
	contentSecurityPolicy: {
	    'default-src': "'none'",
	    'script-src': "'self'",
	    'font-src': "'self'",
	    'connect-src': "'self'",
	    'img-src': "'self'",
	    'style-src': "'self'",
	    'media-src': "'self'"
	}
    };

    if (environment === 'development') {
	// ENV.APP.LOG_RESOLVER = true;
	// ENV.APP.LOG_ACTIVE_GENERATION = true;
	// ENV.APP.LOG_TRANSITIONS = true;
	// ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
	// ENV.APP.LOG_VIEW_LOOKUPS = true;
	ENV.contentSecurityPolicy['script-src'] += " 'unsafe-inline' dev.planecq.com:35729";
	ENV.contentSecurityPolicy['connect-src'] += " ws://dev.planecq.com:35729";
	
	/* config for ember-data-sails */
	ENV.APP.SAILS_LOG_LEVEL = 'debug';
	ENV.APP.emberDataSails =  {
	    host: 'https://dev.planecq.com:1337',
	    scriptPath: '/js/dependencies/sails.io.js'
	};
	// allow to fetch the script
	ENV.contentSecurityPolicy['script-src'] += ' https://dev.planecq.com:1337';
	// allow the websocket to connect
	ENV.contentSecurityPolicy['connect-src'] += ' https://dev.planecq.com:1337 wss://dev.planecq.com:1337';
	/* end of config for ember-data-sails */
	
    }

    if (environment === 'test') {
	// Testem prefers this...
	ENV.baseURL = '/';
	ENV.locationType = 'none';

	// keep test console output quieter
	ENV.APP.LOG_ACTIVE_GENERATION = false;
	ENV.APP.LOG_VIEW_LOOKUPS = false;

	ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {

    }

    return ENV;
};
