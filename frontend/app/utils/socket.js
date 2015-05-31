import tokens from './tokens';

export default function socket() {
    return {

	request: function(context, type, url, data, cb) {
	    var that = context;
	    tokens().addCsrfAndJwt(that, data, function(err, data) {
		if(err) {
		    that.set('errorMessage', err);
		    that.set('attempts', that.get('attempts')+1);
		} else {
		    that.set('loading', true);
		    that.sailsSocket.request(type, url, data).then(function(response) {
			that.set('loading', false);
			if(response.error) {
			    cb(response.error);
			} else {
			    console.log(response);
			    cb(null, response);
			}
		    });
		}
	    });
	}
	
    };
}
