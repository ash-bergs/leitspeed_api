const Users = require("./api/routers/users-model");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
require("dotenv").config();

passport.serializeUser((user, done) => {
	// done(null, user.id);
	done(null, user);
});

passport.deserializeUser((obj, done) => {
	// Users.findById(obj, done);
	done(null, obj);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
		},
		(accessToken, refreshToken, profile, done) => {
			console.log("profile", accessToken);
			//* create new user object from profile obj response from google maybe move this to the else block no sense in creating user object for user already in db

			const newUser = {
				googleId: profile.id,
				name: profile.name.givenName,
				username: profile.name.familyName,
			};
			// console.log("-------------------New user", newUser);
			// Query the database to find user record associated with this
			// google profile, then pass that object to done callback
			Users.findByGoogleId(profile.id).then((id) => {
				// console.log("+++++++++++++++++++", id);
				if (id) {
					return done(null, profile, accessToken);
				} else {
					Users.add(newUser).then((id) => {
						return done(null, profile);
					});
				}
			});
		}
	)
);

module.exports = { passport: passport };
