const router = require("express").Router();
const bcrypt = require("bcrypt");
const users = require("./users-model");

// passport setup
// ? I'm not sure if this is the right place to be doing this. Should passport be set up in the server.js file?
// passport core
// const passport = require('passport');
// // external function we defined in the passport-config file
// const initializePassport = require('../../passport-config');
// // calling that function and passing in passport variable
// initializePassport(passport, username => {
//     // passing in the findByUsername function here
//     users.findByUsername(username)
// });

//TODO [🦄] Delete a user

//* Get all users
//* Sanity checked ✅
router.get("/", (req, res) => {
	users
		.find()
		.then((users) => {
			res.status(200).json({ data: users });
		})
		.catch(handleError);
});

//* Get user by id {dynamic param}
//* Sanity checked ✅
router.get("/:id", (req, res) => {
	const { id } = req.params;

	users
		.findById(id)
		.then((user) => {
			res.status(200).json({ data: user });
		})
		.catch(handleError);
});

//? find by username - to be used for authentication
// ? This function isn't working how I want it to. Problem might be in the model
// ? Or I'm grabbing the username (or thinking of the :username parameter wrong entirely) and need to isolate it more
router.get("/:username", (req, res) => {
	const { username } = req.params;

	users
		.findByUsername(username)
		.then((user) => {
			res.status(200).json({ data: user });
		})
		.catch(handleError);
});

//* Post a new user
router.post("/register", (req, res) => {
	//? What things does a user *need* to be added successfully?
	//* name, password, username, email (optional)
	//TODO - create a piece of middleware that checks for name, username and password
	const { name, username, password, email } = req.body;
	// rounds - i.e. times the password will be hashed
	const rounds = process.env.BCRYPT_ROUNDS || 4;

	if (name && username && password) {
		users
			.add({
				name,
				username,
				password: bcrypt.hashSync(password, rounds),
				email,
			})
			.then((user) => {
				res.status(201).json({ message: `Welcome ${username}` });
			})
			.catch((error) => {
				res.status(500).json({ message: error });
			});
	} else if (!name || !username || !password) {
		res.status(403).json({
			message:
				"Missing or invalid field entries, username and password required!",
		});
	}
});

/* --------------------------- Note on Middleware --------------------------- */
//* We could use a handleError function to handle errors, perhaps logging them, and pass it to the catch clause.
//TODO [🦄] Make this more robust, handle saving errors somewhere to see later? How can I do that?

function handleError(error) {
	res.status(500).json({ message: error.message });
}

/* ----------------------- tips for writing end points ---------------------- */
// start the statement in total but empty to start
//* db('users').then().catch() for example - helps keep in mind promise rules

//! Don't forget to export & import into server.js
module.exports = router;
