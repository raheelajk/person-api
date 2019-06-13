//const personSchema = new Schema({
//    id: Number,
//    first_name: String,
//    last_name: String,
//    username: String,
//    password: String,
//    street: String,
//    apartment: String,
//    city: String,
//    state: String,
//    zip: String,
//    country: String
//});

exports.findByUsername = (fields, username) => {
    let usernameQuery = "SELECT " + fields + " FROM `persons` WHERE username = '" + username + "'";
    console.log(db.query(usernameQuery, (err, result) => {
	if (err) {
	    return err;
	}
	if (result.length > 0) {
	    return result;
	}
	else {
	    return false;
	}
    }));
};
exports.findById = (fields, id) => {
    let idQuery = "SELECT " + fields + " FROM `persons` WHERE id = '" + id + "'";
    db.query(idQuery, (err, result) => {
	if (err) {
	    return err;
	}
	if (result.length > 0) {
	    return result;
	}
	else {
	    return false;
	}
    });
};
