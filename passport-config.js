const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Users = require("./api/routers/users-model");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

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
			//* Query the database to find user record associated with this
			//* google profile, then pass that object to done callback passing the token down as well on found profile probably need to do the same on new user

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

// just passing singular paramter of passport
function initialize(passport) {
	const authenticateUser = (username, password, done) => {
		// ? I'm not sure what to do with this function... getUser
		// ? Can i use the model's .find function and match for username??
		// following this tutorial: https://www.youtube.com/watch?v=-RCnNyD0L-s
		Users.findByUsername(username)
			.then((user) => {
				if (user == null) {
					// message will be displayed through the failureFlash property in the login route
					return done(null, false, {
						message: "No user with that username found",
					});
				} else {
					if (bcrypt.compareSync(password, user.password)) {
						// if this returns true, the user is authenticated
						// return the user we want to authenticate with
						return done(null, user);
					} else {
						// users password didn't match hashed password in db
						return done(null, false, { message: "Password incorrect" });
					}
				}
			})
			.catch((error) => done(error));
	};
	passport.use(new LocalStrategy(authenticateUser));
	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, done) => {
		Users.findById(id).then((user) => {
			return done(null, user);
		});
	});
}

module.exports = {
	passport: passport,
	initialize: initialize,
};
// module.exports = initialize;
