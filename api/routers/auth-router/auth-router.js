//* all authentication routes (via passport) live here - for the time being Google is being used at the only 'strategy'

//* create an instance of an express router
const express = require("express");
const router = express.Router();
const Users = require("../users-model");
const bcrypt = require("bcrypt");
const { passport } = require("../../../passport-config");
const generateToken = require("./generateToken");
const url = require("url");

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
		//* Authenticated successfully redirect home page request.authInfo holds the auth token sent by google need to send this to the front end for authorization
		const token = request.authInfo;
		response.redirect(
			url.format({
				pathname: process.env.FRONTEND_BASE_URL,
				query: {
					token,
					user: request.user,
				},
			})
		);
		// response.status(200).json({ user: request.user, token: request.authInfo });
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

router.post(
	"/login",
	passport.authenticate("local", { failureRedirect: "/login" }),
	function (req, res) {
		console.log("response obj", res);
		const token = generateToken(req.user);
		console.log(token);
		res.status(200).json({ token, message: "Logged In", user: req.user });
		// res.redirect(
		// 	url.format({
		// 		pathname: process.env.FRONTEND_BASE_URL,
		// 		query: {
		// 			token,
		// 			user: req.user,
		// 		},
		// 	})
		// );
	}
);

router.post("/register", async (req, res) => {
	const user = req.body;
	const hashedPassword = await bcrypt.hash(req.body.password, 10);
	user.password = hashedPassword;
	console.log(user);
	Users.add(user)
		.then((addedUser) => {
			const token = generateToken(addedUser);
			console.log(addedUser);
			res.status(201).json({ token: token, user: addedUser });
		})
		.catch((error) => {
			res.status(500).json({ error: error.message });
		});
});

module.exports = router;
