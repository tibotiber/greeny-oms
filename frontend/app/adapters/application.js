import SailsSocketAdapter from 'ember-data-sails/adapters/sails-socket';

export default SailsSocketAdapter.extend({
    useCSRF: true,
    coalesceFindRequests: true
});
