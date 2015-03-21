/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

    /***************************************************************************
     * Set the default database connection for models in the production        *
     * environment (see config/connections.js and config/models.js )           *
     ***************************************************************************/

    // models: {
    //   connection: 'someMysqlServer'
    // },

    /***************************************************************************
     * Set the port in the production environment to 80                        *
     * or 443 for ssl and remember to use "sudo sails lift"                    *
     ***************************************************************************/

    port: 443,

    /***************************************************************************
     * Set the log level in production environment to "silent"                 *
     ***************************************************************************/

    log: {
	level: 'info'
    },

    /* leave more time for grunt to load */
    grunt: {
	_hookTimeout: 600000
    },

    /* deactivate dev autoreload hook */
    autoreload: {
	active: false
    },

    /* define cron jobs timings here */
    cronJobs: {
	backupDB	: '0 0 3 * * 0-6', // backup db every day at 3am
    }
    
};
