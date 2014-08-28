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
		    if(!err)
			callback(null, created.id);
		    else
			callback(err, null);
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
		
		var createProduct = function(code, callback) {
		    // create product
		    FishProduct.create({
			family: familyId,
			code: code,
			name: _.type,
			scientificName: _.scientific,
			chineseName: _.chinese
		    }).exec(function(err, created) {
			if(!err)
			    callback(null, created.id);
			else
			    callback("Error creating product:\n"+err, null);
		    });
		};
		
		// build product code		
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
			createProduct(familyCode+nextId, callback);
		    } else if(!err) {
			// first product in the family
			FishFamily.findOne(familyId).exec(function(err, found) {
			    if(!err && found)
				createProduct(found.code+'001', callback);
			    else if(!err && !found)
				callback("Error building product code: no family", null);
			    else
				callback("Error building product code (search family):\n"+err, null);
			});
		    } else {
			callback("Error building product code (search product):\n"+err);
		    }
		});
	    } else {
		callback("Error searching for family:\n"+err, null);
	    }
	});
    },

    makeVariant: function(_, productId, callback) {
	// build sku
	FishProduct.findOne(productId).exec(function(err, found) {
	    if(!err && found) {
		var sku = found.code;
		if(_.size) sku += '/'+_.size;
		if(_.gender) sku += '/'+_.gender.charAt(0);
		if(_.grade) sku += '/'+_.grade;
		
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
		    individuallyPacked: _.indiv==='T',
		    needMoreOxygen: _.moreox==='T',
		    needLessOxygen: _.lessox==='T',
		    needHighDryness: _.dry==='T',
		    needKetapangLeaf: _.leaf==='T',
		    packedAt23Degrees: _.deg23==='T'
		}).exec(function(err, created) {
		    if(!err)
			callback(null, created.sku);
		    else
			callback("Error creating variant:\n"+err, null);
		});
	    } else if (!err) {
		callback("Error creating variant: product not found.", null);
	    } else {
		callback("Error creating variant:\n"+err, null);
	    }
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
		}).exec(callback);
	    },
	    function(callback){
		// wholesale
		Pricelist.create({
		    sku: sku,
		    pricetier: 1,
		    price: _.wholesale,
		    currency: 1
		}).exec(callback);
	    },
	    function(callback){
		// usd
		Pricelist.create({
		    sku: sku,
		    pricetier: 1,
		    price: _.usd,
		    currency: 2
		}).exec(callback);
	    }
	], function(err, results){
	    if(!err) callback(null);
	    else callback("Error setting prices:\n"+err);
	});
    },
    
    find: function(cb) {
	var that = this;
	PricelistImport.find({transfer: null}).sort('id ASC').exec(function(err, found) {
	    if(!err) {
		async.eachSeries(found, function(_, cb){that._import(_, that, cb);}, function(err){
		    if(!err) {
			sails.log("IT IS A FULL SUCCESS!");
			sails.log("YOU SHOULD CHECK THAT THE FAMILY CODES ARE THE GOOD ONES AND NOT THE AUTO-GENERATED ONES.");
			sails.log("IF THEY ARE AUTO-GENERATED, MODIFY THEM, EMPTY OTHER DB AND RUN AGAIN!");
			cb();
		    } else {
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
