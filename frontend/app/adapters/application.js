import SailsRESTAdapter from 'ember-data-sails/adapters/sails-rest';

export default SailsRESTAdapter.extend({
    host: 'https://dev.planecq.com:1337',
    namespace: '',
    useCSRF: true,
    coalesceFindRequests: true
});
