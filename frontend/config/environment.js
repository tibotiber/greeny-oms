/* jshint node: true */

module.exports = function(environment) {
    var ENV = {
	modulePrefix: 'greeny-oms-client',
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
	    'font-src': "'self' http://themes.googleusercontent.com http://fonts.gstatic.com",
	    'connect-src': "'self'",
	    'img-src': "'self' https://dev.planecq.com:1337",
	    'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com",
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

	/* config for waterlock */
	ENV['simple-auth'] = {
	    authorizer: 'simple-auth-authorizer:token',
	    crossOriginWhitelist: ['https://dev.planecq.com:1337'],
	    routeAfterAuthentication: 'main',
	    routeIfAlreadyAuthenticated: 'main'
	};
	ENV['simple-auth-token'] = {
	    serverTokenEndpoint: 'https://dev.planecq.com:1337/auth/login',
	    authorizationPrefix: 'JWT ',
	    tokenPropertyName: 'access_token', // this keeps the session persisted
	    authorizationHeaderName: 'X-Auth',
	    identificationField: 'username',
	    refreshAccessTokens: true,
	    serverTokenRefreshEndpoint: 'https://dev.planecq.com:1337/users/jwt',
	    refreshLeeway: 600, // refresh 10min before expiry
	    timeFactor: 1  // set to "1000" to convert incoming seconds to milliseconds.
	};
	ENV['simple-auth-sails'] = {
	    serverLogoutEndpoint: 'https://dev.planecq.com:1337/auth/logout'
	};
	/* end of config for waterlock */
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
