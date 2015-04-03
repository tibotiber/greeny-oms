/**
 * FishFamily.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    migrate: 'safe',
    
    attributes: {

	code: {
	    type: 'string',
	    required: true,
	    unique: true,
	    size: 2
	},

	name: {
	    type: 'string',
	    required: true,
	    unique: true,
	}
	
    }
    
};
