function UserFormValidator() {
    $('#userForm').bootstrapValidator({
	message: 'This value is not valid',
	excluded: ':disabled',
	fields: {
	    username: {
		message: 'The username is not valid',
		validators: {
		    notEmpty: {
			message: 'The username is required and can\'t be empty'
		    },
		    stringLength: {
			min: 5,
			max: 20,
			message: 'The username must be more than 5 and less than 20 characters long'
		    },
		    regexp: {
			regexp: /^[a-zA-Z0-9_\.]+$/,
			message: 'The username can only consist of alphabetical, number, dot and underscore'
		    }
		}
	    },
	    name: {
		message: 'The name is not valid',
		validators: {
		    notEmpty: {
			message: 'The name is required and can\'t be empty'
		    },
		    regexp: {
			regexp: /^[a-zA-Z ]+$/,
			message: 'The name can only consist of alphabetical, and space'
		    }
		}
	    },
	    email: {
		validators: {
		    notEmpty: {
			message: 'The email address is required and can\'t be empty'
		    },
		    emailAddress: {
			message: 'The input is not a valid email address'
		    }
		}
	    },
	    password: {
		validators: {
		    notEmpty: {
			message: 'The password is required and can\'t be empty'
		    }
		}
	    },
	    confirmPassword: {
		validators: {
		    notEmpty: {
			message: 'The confirm password is required and can\'t be empty'
		    },
		    identical: {
			field: 'password',
			message: 'The password and its confirm are not the same'
		    }
		}
	    },
	    currentPassword: {
		validators: {
		    notEmpty: {
			message: 'The password is required and can\'t be empty'
		    }
		}
	    },
	    profile_pic: {
		validators: {
		    file: {
			extension: 'jpeg',
			type: 'image/jpeg',
			maxSize: 1024*1024,//1MB
			message: 'The profile picture must a jpeg file of 1MB maximum.'
		    }/*,
		    callback: {
			callback: function(value, validator) {
			    // Manual file check for uploads with skipper
			    alert(JSON.stringify(valueS));
			    var options = validator.getFieldElements('profile_pic').val();
			    alert(options);
			    return false;
			},
			message: 'The profile picture must a jpeg file of 1MB maximum.'
		    }*/
		}
	    }
	}
    });
}


function LoginFormValidator() {
    $('#loginForm').bootstrapValidator({
	message: 'This value is not valid',
	fields: {
	    username: {
		message: 'The username is not valid',
		validators: {
		    notEmpty: {
			message: 'The username is required and can\'t be empty'
		    },
		    stringLength: {
			min: 5,
			max: 20,
			message: 'The username must be more than 5 and less than 20 characters long'
		    },
		    regexp: {
			regexp: /^[a-zA-Z0-9_\.]+$/,
			message: 'The username can only consist of alphabetical, number, dot and underscore'
		    }
		}
	    },
	    password: {
		validators: {
		    notEmpty: {
			message: 'The password is required and can\'t be empty'
		    }
		}
	    }
	}
    });
}


function DemoFormValidator(){
    $('#defaultForm').bootstrapValidator({
	message: 'This value is not valid',
	fields: {
	    username: {
		message: 'The username is not valid',
		validators: {
		    notEmpty: {
			message: 'The username is required and can\'t be empty'
		    },
		    stringLength: {
			min: 6,
			max: 30,
			message: 'The username must be more than 6 and less than 30 characters long'
		    },
		    regexp: {
			regexp: /^[a-zA-Z0-9_\.]+$/,
			message: 'The username can only consist of alphabetical, number, dot and underscore'
		    }
		}
	    },
	    country: {
		validators: {
		    notEmpty: {
			message: 'The country is required and can\'t be empty'
		    }
		}
	    },
	    acceptTerms: {
		validators: {
		    notEmpty: {
			message: 'You have to accept the terms and policies'
		    }
		}
	    },
	    email: {
		validators: {
		    notEmpty: {
			message: 'The email address is required and can\'t be empty'
		    },
		    emailAddress: {
			message: 'The input is not a valid email address'
		    }
		}
	    },
	    website: {
		validators: {
		    uri: {
			message: 'The input is not a valid URL'
		    }
		}
	    },
	    phoneNumber: {
		validators: {
		    digits: {
			message: 'The value can contain only digits'
		    }
		}
	    },
	    color: {
		validators: {
		    hexColor: {
			message: 'The input is not a valid hex color'
		    }
		}
	    },
	    zipCode: {
		validators: {
		    usZipCode: {
			message: 'The input is not a valid US zip code'
		    }
		}
	    },
	    password: {
		validators: {
		    notEmpty: {
			message: 'The password is required and can\'t be empty'
		    },
		    identical: {
			field: 'confirmPassword',
			message: 'The password and its confirm are not the same'
		    }
		}
	    },
	    confirmPassword: {
		validators: {
		    notEmpty: {
			message: 'The confirm password is required and can\'t be empty'
		    },
		    identical: {
			field: 'password',
			message: 'The password and its confirm are not the same'
		    }
		}
	    },
	    ages: {
		validators: {
		    lessThan: {
			value: 100,
			inclusive: true,
			message: 'The ages has to be less than 100'
		    },
		    greaterThan: {
			value: 10,
			inclusive: false,
			message: 'The ages has to be greater than or equals to 10'
		    }
		}
	    }
	}
    });
}


function SupportFormValidator() {
    $('#supportForm').bootstrapValidator({
	message: 'This value is not valid',
	fields: {
	    type: {
		validators: {
		    notEmpty: {
			message: 'Please choose a support category.'
		    }
		}
	    },
	    frequency: {
		validators: {
		    notEmpty: {
			message: 'Please indicate the frequency of your problem.'
		    }
		}
	    },
	    subject: {
		validators: {
		    notEmpty: {
			message: 'Please key in the subject of the support ticket.'
		    },
		    stringLength: {
			max: 50,
			message: 'The subject must be less than 50 characters'
		    }
		}
	    },
	    description: {
		validators: {
		    notEmpty: {
			message: 'Please describe your issue to help us assist you efficiently.'
		    }
		}
	    }
	}
    });
}

function FishFamilyFormValidator() {
    $('.jtable-dialog-form').bootstrapValidator({
	message: 'This value is not valid',
	fields: {
	    code: {
		validators: {
		    notEmpty: {
			message: 'Please choose a family code.'
		    },
		    stringLength: {
			min: 2,
			max: 2,
			message: 'The family code must be 2 letters long.'
		    },
		    stringCase: {
			'case': 'upper',
			message: 'The family code must be upper case.'
		    }
		}
	    },
	    name: {
		validators: {
		    notEmpty: {
			message: 'Please choose a family name.'
		    }
		}
	    }
	}
    });
}

function FishProductFormValidator() {
    $('.jtable-dialog-form').bootstrapValidator({
	message: 'This value is not valid',
	fields: {
	    family: {
		validators: {
		    notEmpty: {
			message: 'Please choose a family.'
		    }
		}
	    },
	    name: {
		validators: {
		    notEmpty: {
			message: 'Please choose a product name.'
		    }
		}
	    }
	}
    });
}

function FishVariantFormValidator() {
    $('.jtable-dialog-form').bootstrapValidator({
	message: 'This value is not valid',
	fields: {
	    size: {
		validators: {
		    notEmpty: {
			message: 'Please choose a size for this variant.'
		    }
		}
	    },
	    density20h: {
		validators: {
		    integer: {
			message: 'The value is not an integer'
		    }
		}
	    },
	    density24h: {
		validators: {
		    integer: {
			message: 'The value is not an integer'
		    }
		}
	    },
	    density30h: {
		validators: {
		    integer: {
			message: 'The value is not an integer'
		    }
		}
	    },
	    density36h: {
		validators: {
		    integer: {
			message: 'The value is not an integer'
		    }
		}
	    },
	    density42h: {
		validators: {
		    integer: {
			message: 'The value is not an integer'
		    }
		}
	    }
	}
    });
}

function FishPriceFormValidator() {
    $('.jtable-dialog-form').bootstrapValidator({
	message: 'This value is not valid',
	fields: {
	    type: {
	    	validators: {
	    	    notEmpty: {
	    		message: 'Please choose a type of price.'
	    	    }
	    	}
	    },
	    thirdparty: {
	    	validators: {
	    	    notEmpty: {
	    		message: 'Please choose a thirdparty.'
	    	    }
	    	}
	    },
	    price: {
	    	validators: {
	    	    notEmpty: {
	    		message: 'Please indicate a price.'
	    	    },
		    numeric: {
			message: 'The value is not numeric.'
		    }
	    	}
	    },
	    currency: {
	    	validators: {
	    	    notEmpty: {
	    		message: 'Please choose a currency.'
	    	    }
	    	}
	    },
	    discount: {
		validators: {
		    integer: {
			message: 'The value is not an integer.'
		    }
		}
	    }
	}
    });
}

function CurrencyFormValidator() {
    $('.jtable-dialog-form').bootstrapValidator({
	message: 'This value is not valid',
	fields: {
	    code: {
	    	validators: {
	    	    notEmpty: {
	    		message: 'Please indicate a currency code.'
	    	    },
		    stringLength: {
			min: 3,
			max: 3,
			message: 'The currency code must be 3 letters long.'
		    },
		    stringCase: {
			'case': 'upper',
			message: 'The currency code must be upper case.'
		    }
	    	}
	    },
	    name: {
	    	validators: {
	    	    notEmpty: {
	    		message: 'Please indicate a currency name.'
	    	    }
		}
	    },
	    rate: {
	    	validators: {
	    	    notEmpty: {
	    		message: 'Please indicate the rate to SGD (e.g. 2.45 for MYR).'
	    	    },
		    numeric: {
	    		message: 'The rate must be numeric.'
	    	    },
		}
	    }
	}
    });
}

function PricetierFormValidator() {
    $('.jtable-dialog-form').bootstrapValidator({
	message: 'This value is not valid',
	fields: {
	    code: {
	    	validators: {
	    	    notEmpty: {
	    		message: 'Please indicate a pricetier code.'
	    	    },
		    stringLength: {
			min: 3,
			max: 3,
			message: 'The pricetier code must be 3 letters long.'
		    },
		    stringCase: {
			'case': 'upper',
			message: 'The pricetier code must be upper case.'
		    }
	    	}
	    },
	    name: {
	    	validators: {
	    	    notEmpty: {
	    		message: 'Please indicate a pricetier name.'
	    	    }
		}
	    },
	    accountCode: {
	    	validators: {
	    	    notEmpty: {
	    		message: 'Please indicate the account code for this price tier. Default is 000.'
	    	    }
		}
	    }
	}
    });
}

function CustomerFormValidator() {
    $('.jtable-dialog-form').bootstrapValidator({
	message: 'This value is not valid',
	fields: {
	    code: {
	    	validators: {
	    	    notEmpty: {
	    		message: 'Please choose a customer code.'
	    	    },
		    stringLength: {
			min: 2,
			max: 2,
			message: 'The customer code must be 2 letters long.'
		    },
		    stringCase: {
			'case': 'upper',
			message: 'The customer code must be upper case.'
		    }
	    	}
	    },
	    name: {
	    	validators: {
	    	    notEmpty: {
	    		message: 'Please indicate a company name.'
	    	    }
		}
	    },
	    email: {
		validators: {
		    emailAddress: {
			message: 'The value is not a valid email address.'
		    }
		}
	    }
	}
    });
}

function SupplierFormValidator() {
    $('.jtable-dialog-form').bootstrapValidator({
	message: 'This value is not valid',
	fields: {
	    code: {
	    	validators: {
	    	    notEmpty: {
	    		message: 'Please choose a supplier code.'
	    	    },
		    stringLength: {
			min: 2,
			max: 2,
			message: 'The supplier code must be 2 letters long.'
		    },
		    stringCase: {
			'case': 'upper',
			message: 'The supplier code must be upper case.'
		    }
	    	}
	    },
	    name: {
	    	validators: {
	    	    notEmpty: {
	    		message: 'Please indicate a company name.'
	    	    }
		}
	    },
	    email: {
		validators: {
		    emailAddress: {
			message: 'The value is not a valid email address.'
		    }
		}
	    }
	}
    });
}

function ContactFormValidator() {
    $('.jtable-dialog-form').bootstrapValidator({
	message: 'This value is not valid',
	fields: {
	    name: {
	    	validators: {
	    	    notEmpty: {
	    		message: 'Please indicate the name of the contact person.'
	    	    }
	    	}
	    },
	    email: {
		validators: {
		    emailAddress: {
			message: 'The value is not a valid email address.'
		    }
		}
	    }

	}
    });
}

function AirportFormValidator() {
    $('.jtable-dialog-form').bootstrapValidator({
	message: 'This value is not valid',
	fields: {
	    code: {
	    	validators: {
	    	    notEmpty: {
	    		message: 'Please indicate the code of the airport.'
	    	    }
	    	}
	    },
	    name: {
	    	validators: {
	    	    notEmpty: {
	    		message: 'Please indicate the name of the airport.'
	    	    }
	    	}
	    },
	    town: {
	    	validators: {
	    	    notEmpty: {
	    		message: 'Please indicate the town of the airport.'
	    	    }
	    	}
	    },
	    country: {
	    	validators: {
	    	    notEmpty: {
	    		message: 'Please indicate the country of the airport.'
	    	    }
	    	}
	    },
	    timezone: {
	    	validators: {
	    	    notEmpty: {
	    		message: 'Please indicate the timezone of the airport. This field has autocomplete.'
	    	    }
	    	}
	    }
	}
    });
}
