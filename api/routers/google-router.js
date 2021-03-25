var express = require("express");
var router = express.Router();
var auth = require("../../passport-google");

// GET root page
router.get("/", (request, response) => {
	response.render("index", { user: request.user });
});

// GET login page
router.get("/login", (request, response) => {
	// response.render("login", { user: request.user });
	console.log(response);
	response.redirect("https://leitspeed-fe.vercel.app/login");
});

// GET route for when you click on login - passport authenticates through google
router.get(
	"/auth/google",
	auth.passport.authenticate("google", { scope: ["openid email profile"] })
);

// If successful auth - redirects to home page, if not - redirects to /login
router.get(
	"/auth/google/callback",
	auth.passport.authenticate("google", {
		failureRedirect: "/login",
	}),
	(request, response) => {
		console.log("req object++++++++++++++++++++++++", request.authInfo);
		// Authenticated successfully
		response.redirect("https://leitspeed-fe.vercel.app/");
	}
);

// GET logout route - will sign person out of session
router.get("/logout", (request, response) => {
	request.logout();
	response.redirect("/");
});

// Route middleware to ensure user is authenticated.
function ensureAuthenticated(request, response, next) {
	if (request.isAuthenticated()) {
		return next();
	}
	response.redirect("/login");
}

module.exports = router;
