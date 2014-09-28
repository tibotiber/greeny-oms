/**
* Contact.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

      company: {
	  model: 'company'
      },

      name: {
	  type: 'string',
	  required: true
      },

      position: {
	  type: 'string'
      },

      email: {
	  type: 'string',
	  email: true
      },

      phone: {
	  type: 'string'
      },

      main: {
	  type: 'boolean',
	  defaultsTo: false
      }
      
  }
    
};
