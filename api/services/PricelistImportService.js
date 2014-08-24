// PricelistImportService.js
module.exports = {
    
    _import: function(_, that, cb) {
	// prepare variables
	var familyId, productId, sku;
	var done = function(error){
	    that.done(_.id, error, cb);
	};

	async.series([
	    function(callback){
		that.getFamily(_, function(err, id) {
		    if(!err)
			familyId = id;
		    callback(err);
		});
	    },
	    function(callback){
		that.getProduct(_, familyId, function(err, id) {
		    if(!err)
			productId = id;
		    callback(err);
		});
	    },
	    function(callback){
		that.makeVariant(_, productId, function(err, id) {
		    if(!err)
			sku = id;
		    callback(err);
		});
	    },
	    function(callback){
		that.storePrices(_, sku, callback);
	    }
	],function(err, results){
		done(err);
	});
    },

    getFamily: function(_, callback) {
	FishFamily.findOne({name: _.family}).exec(function(err, found) {
	    if(!err && found) {
		// found family, store it
		callback(null, found.id);
	    } else if(!err & !found) {
		// create family
		FishFamily.create({
		    code: _.family.substring(0,2).toUpperCase(),
		    name: _.family
		}).exec(function(err, created) {
		    callback(err, created.id);
		});
	    } else {
		callback("Error searching for family:\n"+err, null);
	    }
	});
    },

    getProduct: function(_, familyId, callback) {
	FishProduct.findOne({family: familyId, name: _.type}).exec(function(err, found) {
	    if(!err && found) {
		// found product, store it
		callback(null, found.id);
	    } else if(!err & !found) {
		// build product code
		var code;
		FishProduct.find({family: familyId}).sort('code DESC').limit(1).exec(function(err, found) {
		    if(!err && found) {
			// not the first product in the family
			var familyCode = found.code.substring(0,2);
			var nextId = parseInt(found.code.substring(2,6))+1;
			code = familyCode+nextId;
		    } else if(!err & !found) {
			// first product in the family
			FishFamily.findOne(familyId).exec(function(err, found) {
			    if(!err && found)
				code = found.code+'001';
			    else if(!err && !found)
				callback("Error building product code: no family", null);
			    else
				callback("Error building product code:\n"+err, null);
			});
		    } else {
			callback("Error building product code:\n"+err);
		    }
		});
		
		// create product
		FishProduct.create({
		    family: familyId,
		    code: code,
		    name: _.type,
		    scientificName: _.scientific,
		    chineseName: _.chinese
		}).exec(function(err, created) {
		    callback("Error creating product:\n"+err, created.id);
		});
	    } else {
		callback("Error searching for family:\n"+err, null);
	    }
	});
    },

    makeVariant: function(_, productId, callback) {
	// build sku
	var sku = productId;
	if(_.size) sku += '/'+size;
	if(_.gender) sku += '/'+gender.charAt(0);
	if(_.grade) sku += '/'+grade;
	
	FishVariant.create({
	    sku: sku,
	    product: productId,
	    size: _.size,
	    sizeInMillis: _.mm,
	    sizeInInches: _.inch,
	    gender: _.gender,
	    grade: _. grade,
	    density20h: _.d20h,
	    density24h: _.d24h,
	    density30h: _.d30h,
	    density36h: _.d36h,
	    density42h: _.d42h,
	    individuallyPacked: _.indiv,
	    needMoreOxygen: _.moreox,
	    needLessOxygen: _.lessox,
	    needHighDryness: _.dry,
	    needKetapangLeaf: _.leaf,
	    packedAt23Degrees: _.deg23
	}).exec(function(err, created) {
	    callback("Error creating variant:\n"+err, created.sku);
	});
    },

    storePrices: function(_, sku, callback) {
	async.series([
	    function(callback){
		// retail price
		Pricelist.create({
		    sku: sku,
		    pricetier: 2,
		    price: _.retail,
		    currency: 1
		}).exec(function(err, created) {
		    callback("Error setting retail price:\n"+err);
		});
	    },
	    function(callback){
		// wholesale
		Pricelist.create({
		    sku: sku,
		    pricetier: 1,
		    price: _.wholesale,
		    currency: 1
		}).exec(function(err, created) {
		    callback("Error setting wholesale price:\n"+err);
		});	
	    },
	    function(callback){
		// usd
		Pricelist.create({
		    sku: sku,
		    pricetier: 1,
		    price: _.usd,
		    currency: 2
		}).exec(function(err, created) {
		    callback("Error setting usd price:\n"+err);
		});
	    }
	], function(err, results){
	    callback(err);
	});
    },
    
    find: function(cb) {
	var that = this;
	PricelistImport.find({}).exec(function(err, found) {
	    if(!err) {
		async.eachSeries(found, function(_, cb){that._import(_, that, cb);}, function(err){
		    if(!err) {
			sails.log("IT IS A FULL SUCCESS!");
			cb();
		    } else {
			sails.log.error(err);
			cb(err);
		    }
		});
	    } else {
		sails.log.error("Could not extract old pricelist from database:\n"+err);
		cb(err);
	    }
	});
    },

    done: function(id, error, cb) {
	if(!error) {
	    PricelistImport.update(id, {transfer: 'ok'}).exec(function(err, done) {
		if(!err) {
		    sails.log.debug("Import done for #"+id);
		    cb();
		} else {
		    cb("Could not write import result:\n"+err);
		}
	    });
	} else {
	    cb(error);
	}
    }

};
