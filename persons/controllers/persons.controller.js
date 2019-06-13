var moment = require('moment');
const crypto = require('crypto');

module.exports = {
    addPerson: (req, res) => {
	let message = '';
	let first_name = req.body.first_name;
	let last_name = req.body.last_name;
	let username = req.body.username;
	let age = req.body.age;
	let street = req.body.street;
	let apt = req.body.apartment;
	let city = req.body.city;
	let state = req.body.state;
	let zip = req.body.zip;

	let salt = crypto.randomBytes(16).toString('base64');
	let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
	let password = salt + "$" + hash;
	let usernameQuery = "SELECT * FROM `persons` WHERE username = '" + username + "'";
	db.query(usernameQuery, (err, result) => {
	    if (err) {
		return res.status(500).send(err);
	    }
	    if (result.length > 0) {
		message = 'Username already exists';
		return res.status(500).send(message);
	    }
	    else {
		// send the person's details to the database
		let query = "INSERT INTO `persons` (first_name, last_name, username, age,  dob, password, image, street, apartment, city, state, zip, country, creation_time) VALUES ('" +
			first_name + "', '" + last_name + "', '" + username + "', '" + age + "', '1990-01-01', '" + password + "',  'test.jpeg', '" +
			street + "', '" +
			apt + "', '" +
			city + "', '" + state + "', '" +
			zip + "', 'USA', '" +
			moment().format("YYYY-MM-DD hh:mm:ss") + "')";
		db.query(query, (err, result) => {
		    if (err) {
			return res.status(500).send(err);
		    }
		    res.status(200).send('Person successfully added!');
		});
	    }
	});
    },
    editPerson: (req, res) => {
	let personId = req.params.id;
	let first_name = req.body.first_name;
	let last_name = req.body.last_name;
	let age = req.body.age;
	let street = req.body.street;
	let apt = req.body.apartment;
	let city = req.body.city;
	let state = req.body.state;
	let zip = req.body.zip;
	let query = "UPDATE `persons` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name +
		"', `age` = '" + age + "', `street` = '" + street +
		"', `apartment` = '" + apt + "', `city` = '" + city + "', `state` = '" + state + "', `zip` = '" + zip +
		"' WHERE `persons`.`id` = '" + personId + "'";
	db.query(query, (err, result) => {
	    if (err) {
		return res.status(500).send(err);
	    }
	    res.status(200).send('Person successfully edited!');
	});
    },
    deletePerson: (req, res) => {
	let personId = req.params.id;
	let deleteUserQuery = 'DELETE FROM persons WHERE id = "' + personId + '"';
	db.query(deleteUserQuery, (err, result) => {
	    if (err) {
		return res.status(500).send(err);
	    }
	    res.status(200).send('Person successfully deleted!');
	});
    },
    searchPerson: (req, res) => {
	let first_name = req.body.first_name;
	let last_name = req.body.last_name;
	let lower = req.body.age_lower;
	let upper = req.body.age_upper;
	if (!first_name && !last_name && !lower && !upper) {
	    message = 'Please provide a person\'s name or age to perfom search.';
	    return res.status(500).send(message);
	}
	let where = "";
	if (first_name) {
	    where += "first_name = '" + first_name + "'";
	}
	if (last_name) {
	    if (where != "") {
		where += " AND ";
	    }
	    where += "last_name = '" + last_name + "'";
	}
	if (lower) {
	    if (where != "") {
		where += " AND ";
	    }
	    where += "age >= '" + lower + "'";
	}
	if (upper) {
	    if (where != "") {
		where += " AND ";
	    }
	    where += "age <= '" + upper + "'";
	}
	let query = "SELECT id, first_name, last_name, username, age, street, apartment, city, state, zip, country, creation_time\n\
 FROM `persons` WHERE " + where; // query database to get all the players
//	console.log(query);
	// execute query
	db.query(query, (err, result) => {
	    if (err) {
		return res.status(500).send('Something went with the query! Please check your parameters.');
	    }
	    res.status(200).send(result);
	});
    },
    listPersons: (req, res) => {
	let query = "SELECT id, first_name, last_name, username, age, dob, street, apartment, city, state, zip, country, creation_time\n\
 FROM `persons` ORDER BY id ASC"; // query database to get all the players

	// execute query
	db.query(query, (err, result) => {
	    if (err) {
		return res.status(500).send('Something went with the query! Please check your parameters.');
	    }
	    res.status(200).send(result);
	});
    }
};