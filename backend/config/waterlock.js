
/**
 * waterlock
 *
 * defines various options used by waterlock
 * for more informaiton checkout
 * 
 * http://waterlock.ninja/documentation
 */
module.exports.waterlock = {
    
    // Base URL
    // 
    // used by auth methods for callback URI's using oauth and for password
    // reset links.
    // this was moved to config/local.js
    // baseUrl: 'https://dev.planecq.com:1337',
    
    // Auth Method(s) 
    // 
    // this can be a single string, an object, or an array of objects for your 
    // chosen auth method(s) you will need to see the individual module's README
    // file for more information on the attributes necessary. This is an example
    // of the local authentication method with password reset tokens disabled.
    authMethod: [
	{
	    name:'waterlock-local-auth',
	    passwordReset:{},
	    createOnNotFound: false
	}
    ],

    // JSON Web Tokens
    //
    // this provides waterlock with basic information to build your tokens, 
    // these tokens are used for authentication, password reset, 
    // and anything else you can imagine
    jsonWebTokens: {
	// the secret should be moved to config/local.js on fix of https://github.com/waterlock/waterlock/issues/80
	secret: 'To infinity and beyond!',
	expiry:{
	    unit: 'days',
	    length: '7'
	},
	audience: 'Greeny OMS',
	subject: 'jwt4oms',

	// tracks jwt usage if set to true
	trackUsage: true,

	// if set to false will authenticate the
	// express session object and attach the
	// user to it during the hasJsonWebToken 
	// middleware
	stateless: false,
    },

    // Post Actions
    // 
    // Lets waterlock know how to handle different login/logout
    // attempt outcomes.
    postActions:{

	// post login event
	login: {

	    // This can be any one of the following
	    // 
	    // url - 'http://example.com'
	    // relativePath - '/blog/post'
	    // obj - {controller: 'blog', action: 'post'}
	    // string - 'custom json response string'
	    // default - 'default'
	    success: 'default', // change to 'jwt' when https://github.com/waterlock/waterlock/pull/41 is merge

	    // This can be any one of the following
	    // 
	    // url - 'http://example.com'
	    // relativePath - '/blog/post'
	    // obj - {controller: 'blog', action: 'post'}
	    // string - 'custom json response string'
	    // default - 'default'
	    failure: 'default'
	},

	//post logout event
	logout: {

	    // This can be any one of the following
	    // 
	    // url - 'http://example.com'
	    // relativePath - '/blog/post'
	    // obj - {controller: 'blog', action: 'post'}
	    // string - 'custom json response string'
	    // default - 'default'
	    success: 'default',

	    // This can be any one of the following
	    // 
	    // url - 'http://example.com'
	    // relativePath - '/blog/post'
	    // obj - {controller: 'blog', action: 'post'}
	    // string - 'custom json response string'
	    // default - 'default'
	    failure: 'default'
	}
    }
};