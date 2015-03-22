module.exports = function CronHook(sails) {
    
    var CronJob = require('cron').CronJob;
    var exec = require('child_process').exec;
    var moment = require('moment');
    
    var timezone = sails.config.appHost.timezone;

    
    return {

	clock: function() {
	    sails.log('It is now '+new Date().toString());
	},

	backupDB: function() {
	    // execute backup script on database
	    var that = this;
	    var command = "db_bak/backup.sh";
	    exec(command, function (err, stdout, stderr) {
		if(!err)
		    sails.log.info("Successful database backup.");
		else
		    sails.log.error("Error in cron job: database backup.\n"+stderr);
		that.emailDBBackup(err, stderr);
	    });
	},

	emailDBBackup: function(couldNotBackup, error) {
	    // send email to administrator about available backup
	    var mailOptions = {
		to: 'thibaut@planecq.com',
		subject: 'New database backup for Greeny OMS'
	    };
	    if(!couldNotBackup)
		mailOptions.html = "<p>A new backup is available for the Greeny OMS database.<p>" +
		"<p>Please ssh copy it from the server at "+sails.config.appHost.name+" by executing:</p>" +
		"<code>scp -i ~/.ssh/do_rsa "+sails.config.appHost.user+"@"+sails.config.appHost.name+":~/greeny-oms/db_bak/greeny_oms_"+moment().format('YYYY-MM-DD')+".sql.gz ~/Box\\ Sync/Planecq/Greeny\\ OMS/db_bak/</code>";
	    else
		mailOptions.html = "<p>Error backing up database:</p><code>"+error+"</code>";
	    EmailService.send(mailOptions, function(err, info) {
		if(!err)
		    sails.log.info("Email sent to "+mailOptions.to+" concerning the backup.");
		else
		    sails.log.error("Error in cron job: could not send email about database backup.\n"+err);
	    });
	},

	initialize: function (cb) {
	    // Runs automatically when the hook initializes
	    var hook = this;
	    _.each(sails.config.cronJobs, function(cronTime, cronJob) {
		new CronJob(cronTime, hook[cronJob], null, true, timezone);
	    });

	    // confirm hook loaded
	    sails.log.info("CRON hook: all jobs started.");
	    return cb();
	}
	
    };
};
