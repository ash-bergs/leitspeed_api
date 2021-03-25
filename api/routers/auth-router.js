//* all authentication routes (via passport) live here - for the time being Google is being used at the only 'strategy'

//* create an instance of an express router
const express = require("express");
const router = express.Router();
const googleAuth = require("../../passport-google");

router.get("/login", (request, response) => {
	// response.render("login", { user: request.user });
	console.log(response);
	response.redirect("https://leitspeed-fe.vercel.app/login");
});

// GET route for when you click on login - passport authenticates through google
router.get(
	"/google",
	googleAuth.passport.authenticate("google", {
		scope: ["openid email profile"],
	})
);

//* If successful auth - redirects to home page, if not - redirects to /login
router.get(
	"/google/callback",
	googleAuth.passport.authenticate("google", {
		failureRedirect: "/login",
	}),
	(request, response) => {
		console.log("req object++++++++++++++++++++++++", request.authInfo);
		//* Authenticated successfully redirect home page authInfo holds the auth token sent by google need to send this to the front end for authorization

		response.redirect("https://leitspeed-fe.vercel.app/");
	}
);

// *GET logout route - will sign person out of session currently points to hard code dashboard. Prob need to add env file for frontend url

router.get("/logout", (request, response) => {
	request.logout();
	response.redirect("/https://leitspeed-fe.vercel.app/");
});

module.exports = router;
