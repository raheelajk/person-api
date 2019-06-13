//const PersonModel = require('../../persons/models/persons.model');
const crypto = require('crypto');

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
	if (!req.body.username) {
	    errors.push('Missing username field');
	}
	if (!req.body.password) {
	    errors.push('Missing password field');
	}

	if (errors.length) {
	    return res.status(400).send({errors: errors.join(',')});
	}
	else {
	    return next();
	}
    }
    else {
	return res.status(400).send({errors: 'Missing username and password fields'});
    }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
    let usernameQuery = "SELECT id, first_name, last_name, password FROM `persons` WHERE username = '" + req.body.username + "'";
    db.query(usernameQuery, (err, result) => {
	if (err) {
	    return err;
	}
	if (!result[0]) {
	    return res.status(404).send({});
	}
	else {
	    user = result[0];
	    let passwordFields = user.password.split('$');
	    let salt = passwordFields[0];
	    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
	    if (hash === passwordFields[1]) {
		req.body = {
		    userId: user.id,
		    username: user.username,
		    provider: 'username',
		    name: user.first_name + ' ' + user.last_name,
		};
		return next();
	    }
	    else {
		return res.status(400).send({errors: ['Invalid username or password']});
	    }
	}
    });
};