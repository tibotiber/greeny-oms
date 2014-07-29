var uu = require('underscore'),
policies = require('./reqParamsPolicies.json')[0];


module.exports = function(req, res) {
    var bool = true;

    for(key in req){
        if(req.hasOwnProperty(key)){
            if(policies.hasOwnProperty(key.toLowerCase())){
                if(!tests[policies[key.toLowerCase()]](req[key])){
                    bool = false;
                }
            }
        }
    }
    
    if(!bool) res.badRequest();
    return bool;
}

var tests = {};
tests.isInteger = function(value){
    if(!isNaN(Number(value))){
        return true;
    }else{
        return false;
    }
}
tests.isString = function(value){
    var regex = /[[\]{}()*+?.,\\^$|#]+/;
    if(!value.match(regex)){
        return true;
    }else{
        return false;
    }
}
tests.isTimezone = function(value){
	var regex = /[[\]{}()*?.,\\^$|#]+/;
	 if(!value.match(regex)){
        return true;
    }else{
        return false;
	} 
}
tests.isEmail = function(value){
    var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if(value.match(regex)){
        return true;
    }else{
        return false;
    }

}
tests.isMacAddress = function(value){
    var regex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    if(value.match(regex)){
        return true;
    }else{
        return false;
    }
}
tests.isDate = function(value){
    if(uu.isDate(value)){
        return true;
    }else{
        return false;
    }
}
tests.isBool = function(value){
    var regex = /^(on|off|true|false)$/;
    if(value.match(regex)){
        return true;
    }else{
        return false;
    }
}
