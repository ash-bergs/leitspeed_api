//* all authentication routes (via passport) live here - for the time being Google is being used at the only 'strategy'

//* create an instance of an express router
const express = require("express");
const router = express.Router();
const Users = require("./users-model");
const bcrypt = require("bcrypt");
// const googleAuth = require("../../passport-config");
const { passport } = require("../../passport-config");

//* GET route for when you click on login - passport authenticates through google
router.get(
	"/google",
	passport.authenticate("google", {
		scope: ["openid email profile"],
	})
);

//* If successful auth - redirects to home page, if not - redirects to /login
router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: process.env.FRONTEND_BASE_URL + "/login",
	}),
	(request, response) => {
		//* Authenticated successfully redirect home page authInfo holds the auth token sent by google need to send this to the front end for authorization
		response.redirect(process.env.FRONTEND_BASE_URL);
	}
);

// *GET logout route - will sign person out of session currently points to hard code dashboard. Prob need to add env file for frontend url

router.get("/logout", (request, response) => {
	request.logout();
	response.redirect(process.env.FRONTEND_BASE_URL + "/login");
});

//** Local login routes */

/* ------------------------------- About Login ------------------------------ */
/*
Passport is essentially another piece of middleware, like Express.. 
If It's set up in server.js I need to pass Passport to this users router 
in the login POST route I'll have to call the local strategy 
*/
/* -------------------------------------------------------------------------- */
console.log(process.env.FRONTEND_BASE_URL + "/login");
router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: process.env.FRONTEND_BASE_URL,
		failureRedirect: process.env.FRONTEND_BASE_URL + "/login",
		failureFlash: true,
	})
);

router.post("/register", async (req, res) => {
	const user = req.body;
	const hashedPassword = await bcrypt.hash(req.body.password, 10);
	user.password = hashedPassword;
	console.log(user);
	Users.add(user)
		.then((addedUser) => {
			console.log(addedUser);
			res.status(200).json({ addedUser });
		})
		.catch((error) => {
			res.status(500).json({ error: error.message });
		});
});

module.exports = router;
