import SailsSocketAdapter from 'ember-data-sails/adapters/sails-socket';
import tokens from '../utils/tokens';

export default SailsSocketAdapter.extend({
    useCSRF: true,
    coalesceFindRequests: true,
    _request: function(out, url, method, options) {
	var jwt = tokens().getJwt(this);
	url = (jwt) ? url+'?access_token='+jwt : url;
	return this._super(out, url, method, options);
    }
});
