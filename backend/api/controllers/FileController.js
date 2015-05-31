/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    upload: function(req, res, next) {
	var uploadSettings = {
	    dirname: '../../assets/upload/'
	};
	if(req.param('uploadPath')) uploadSettings.dirname += req.param('uploadPath');
	if(req.param('saveAs')) uploadSettings.saveAs = req.param('saveAs');
	req.file('file').upload(uploadSettings, function (err, uploadedFiles){
	    if(err) return res.serverError("Error uploading new profile pic: "+err);
	    res.ok({
		message: uploadedFiles.length + ' file(s) uploaded successfully!',
		files: _.map(uploadedFiles, function(file) {
		    return file.fd.split('/upload/')[1];
		})
	    });
	});
    }
    
};

