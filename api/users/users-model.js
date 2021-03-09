/* -------------------------------------------------------------------------- */
/*                              Creating a Model                              */
/* The model assists the end points using SQL, these functions will be exported 
   and used in the users-router 
*/
//testing
/* -------------------------------------------------------------------------- */

const db = require("../../data/connection");

module.exports = {
	add,
	find,
	findById,
};

function add(user) {
	return db("users")
		.insert(user, "id")
		.then(([id]) => {
			return findById(id);
		});
}

function find() {
	return db("users");
}

function findById(id) {
	return db("users").where({ id }).first();
}
