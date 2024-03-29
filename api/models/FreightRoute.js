/**
 * FreightRoute.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

// utils
Array.prototype.first = function() {
    return this[0];
};

Array.prototype.last = function() {
    return this[this.length-1];
};


module.exports = {

    attributes: {
	
	quotation: {
	    model: 'FreightQuotation',
	    required: true
	},

	description: {
	    type: 'string',
	    required: true
	},
	
	segments: {
	    type: 'array',
	    required: true,
	    defaultsTo: []
	    /* e.g.
	    [{
		"flight": "EY473",
		"departureAirport (dA)": "SIN",
		"departureTime (dT)": "20:20",
		"arrivalAirport (aA)": "AUH",
		"arrivalTime (aT)": "23:45"
	    }, {
		"flight": "EY065",
		"dA": "AUH",
		"dT": "02:05",
		"aA": "DME",
		"aT": "07:25"
	    }]*/
	},

	door_to_door: {
	    /* duration in hours */
	    type: 'integer'
	},

	logInPeriod: {
	    /* duration before flight in hours */
	    type: 'integer'
	},

	'default': {
	    type: 'boolean',
	    defaultsTo: false
	},
	
	notes: {
	    type: 'text'
	},

	departureAirport: function() {
	    return this.segments.first().departureAirport;
	},

	departureTime: function() {
	    return this.segments.first().departureTime;
	},

	arrivalAirport: function() {
	    return this.segments.last().arrivalAirport;
	},

	arrivalTime: function() {
	    return this.segments.last().arrivalTime;
	},

	flightDuration: function() {
	    return this.arrivalTime() - this.departureTime();
	}
	
    }
    
};
