const isEmpty = (string)  => {
    if(string.trim() === '') return true;
    else return false
}

const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(regEx)) return true;
    else return false;
}

exports.validateSignupData = (data) => {
    let errors = {}

    if(isEmpty(data.email)){
        errors.email = 'Must not be empty'
    }
    else if(!isEmail(data.email)){
        errors.email = 'Must be a valid email address'
    }

    if(isEmpty(data.password)) errors.password = 'must not be empty';
    if(data.password !== data.confirmPassword ) errors.confirmPassword = 'Passwords should match';
    if(isEmpty(data.name)) errors.name = 'must not be empty';
    if(isEmpty(data.company)) errors.company = 'must not be empty';

    return {
        errors,
        valid:Object.keys(errors).length === 0 ? true : false
    }
}

exports.validateLoginData = (data) => {
    
    let errors = {};

    if(isEmpty(data.email)) errors.email = 'must not be empty';
    if(!isEmail(data.email)) errors.email = 'invalid email address';
    if(isEmpty(data.password)) error.password = 'must not be empty';

    return {
        errors,
        valid:Object.keys(errors).length === 0 ? true : false
    }
}