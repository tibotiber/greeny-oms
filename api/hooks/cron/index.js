module.exports = function CronHook(sails) {
    
    var CronJob = require('cron').CronJob;
    var exec = require('child_process').exec;

    var timezone = sails.config.timezone;

    
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
	    }

	    async.series([
		function(cb){
		    if(!couldNotBackup) {
			var command = "db_bak/writeEmail.sh";
			exec(command, function (err, stdout, stderr) {
			    if(!err)
				mailOptions.text = stdout;
			    else
				sails.log.error("Error in cron job: could not send email about database backup.\n"+stderr);
			    cb();
			});
		    } else {
			mailOptions.text = "Error backing up database:\n"+error;
			cb();
		    }
		},
		function(cb){
		    EmailService.send(mailOptions, function(err, info) {
			if(!err)
			    sails.log.info("Email sent to "+mailOptions.to+" concerning the backup.");
			else
			    sails.log.error("Error in cron job: could not send email about database backup.\n"+stderr);
			cb();
		    });
		}
	    ]);

	},

	initialize: function (cb) {
	    // Runs automatically when the hook initializes
	    var hook = this;

	    // clock ticking every minute
	    // new CronJob('0 * * * * *', hook.clock, null, true, timezone);

	    // backup database every day at 3am
	    new CronJob('0 0 3 * * 0-6', hook.backupDB, null, true, timezone);
	    
	    // declare more cron jobs here
	    // ...
	    
	    // confirm hook loaded
	    sails.log.info("CRON hook: all jobs started.");
	    return cb();
	}
	
    }
};
