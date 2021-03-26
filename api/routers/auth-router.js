//* all authentication routes (via passport) live here - for the time being Google is being used at the only 'strategy'

//* create an instance of an express router
const express = require("express");
const router = express.Router();
// const googleAuth = require("../../passport-config");
const { initialize, passport } = require("../../passport-config");

router.get("/login", (request, response) => {
	// response.render("login", { user: request.user });
	console.log(response);
	response.redirect("https://leitspeed-fe.vercel.app/login");
});

// GET route for when you click on login - passport authenticates through google
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

//** Local login routes */
router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true,
	})
);

router.post("/register", async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		users.add({
			name: req.body.name,
			username: req.body.username,
			password: hashedPassword,
			email: req.body.email,
		});
		res.redirect("/login");
	} catch {
		res.redirect("/register");
	}
});
module.exports = router;
