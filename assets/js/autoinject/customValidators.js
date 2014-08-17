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