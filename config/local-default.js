/**
 * Local environment settings
 */
var fs = require('fs');

module.exports = {

    appName: "Greeny OMS",
    
    port: process.env.PORT || 1337,

    environment: process.env.NODE_ENV || 'development',

    connections: {
	postgresql: {
	    user     : '',
	    password : '',
	    database : ''
	}
    },

    ssl: {
	key  : fs.readFileSync('ssl/key.pem'),
	cert : fs.readFileSync('ssl/cert.pem')
    },

    emailAccount: {
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
    }

};
