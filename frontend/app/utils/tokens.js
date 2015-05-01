export default function tokens() {
    return {
	
	getCsrf: function(context, cb) {
	    context.sailsSocket.request('get', '/csrfToken').then(function(response) {
		if(response._csrf) {
		    cb(null, response._csrf);
		} else {
		    cb('No CSRF token received.');
		}
	    });
	},

	addCsrf: function(context, data, cb) {
	    context.sailsSocket.request('get', '/csrfToken').then(function(response) {
		if(response._csrf) {
		    data._csrf = response._csrf;
		    cb(null, data);
		} else {
		    cb('No CSRF token received.');
		}
	    });
	},

	getJwt: function(context) {
	    return context.container.lookup('simple-auth-session:main').content.access_token;
	},

	addJwt: function(context, data) {
	    data.access_token = context.container.lookup('simple-auth-session:main').content.access_token;
	    return data;
	},

	addCsrfAndJwt: function(context, data, cb) {
	    data = this.addJwt(context, data);
	    this.addCsrf(context, data, cb);
	}
	
    };
}
