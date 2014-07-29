/**
 * Local environment settings
 */

module.exports = {

    appName: "Greeny OMS",
    
    port: process.env.PORT || 1337,

    environment: process.env.NODE_ENV || 'development',

    adapters: {
	postgresql: {
	    user     : '',
	    password : '',
	    database : ''
	}
    }

};
