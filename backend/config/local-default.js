/**
 * Local environment settings
 */
var fs = require('fs');

module.exports = {

    appName: 'Greeny OMS',

    appHost: {
	name: '',
	user: '',
	timezone: 'Asia/Singapore',
    },
    
    // moved to config/env
    // port: process.env.PORT || 1337,

    environment: process.env.NODE_ENV || 'development',

    connections: {
	postgresql: {
	    user     : '',
	    password : '',
	    database : ''
	}
    },

    ssl: {
	key  : fs.readFileSync('ssl/selfsigned.key'),
	cert : fs.readFileSync('ssl/selfsigned.cert')
    },

    emailAccount: {
	from: 'Example <noreply@example.com>',
        service: 'Gmail',
	auth: {
	    user: '',
	    pass: ''
	}
    },

    googleXOAuth2: {
	// get this from https://console.developers.google.com/
	clientId     : '',
	clientSecret : '',
	redirectUri  : ''
    },
    
    cors: {
	allRoutes: true,
	origin: 'http://...:...'
    },
    
    csrf: {
	origin: 'http://...:...'    
    },

    waterlock: {
	baseUrl: 'https://...:...',
	jsonWebTokens: {
	    secret: '...'
	}
    }

};
