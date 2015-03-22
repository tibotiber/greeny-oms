// ProductCodingService.js
module.exports = {
    
    getNextFishProductCode: function(familyId, cb) {
	// build next product code for a given family (id)
	FishProduct.find({family: familyId}).sort('code DESC').limit(1).exec(function(err, found) {
	    if(!err && found.length > 0) {
		// not the first product in the family
		// extend Number with zero padding method
		Number.prototype.pad = function(size) {
		    var s = String(this);
		    if(typeof(size) !== "number"){size = 2;}
		    while (s.length < size) {s = "0" + s;}
		    return s;
		};
		var familyCode = found[0].code.substring(0,2);
		var nextId = (parseInt(found[0].code.substring(2,6))+1).pad(3);
		cb(null, familyCode+nextId);
	    } else if(!err) {
		// first product in the family
		FishFamily.findOne(familyId).exec(function(err, found) {
		    if(!err && found)
			cb(null, found.code+'001');
		    else if(!err && !found)
			callback("Error building product code: no family", null);
		    else
			callback("Error building product code (search family):\n"+err, null);
		});
	    } else {
		callback("Error building product code (search product):\n"+err);
	    }
	});
    },

    getFishVariantCode: function(productCode, size, gender, grade, cb) {
	// build sku for variant defined in arguments (product must exist)
	FishProduct.findOne(productCode).exec(function(err, found) {
	    if(!err && found) {
		var sku = found.code;
		if(size) sku += '/'+size;
		if(gender) sku += '/'+gender.charAt(0);
		if(grade) sku += '/'+grade;
		cb(null, sku);
	    } else if(!err) {
		cb("Could not find fish product for code: "+productCode);
	    } else {
		cb("Error searching for product:\n"+err);
	    }
	});
    }

};
