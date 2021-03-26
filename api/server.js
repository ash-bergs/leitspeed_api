if (process.env.NODE_ENV !== "production") {
	// checking the environment is not production to use dotenv
	//? should it be pulled from index.js... or should this function be done there instead?
	require("dotenv").config();
}

const express = require("express");
// to query the database for the correct user in the initializePassport function... i need a connection to the users database
const users = require("./routers/users-model");
const bcrypt = require("bcrypt");

//! passport
// ? do these need to be moved after the routers??

const flash = require("express-flash");
const session = require("express-session");
//* importing both local and goolge strategy. google was written into passport so just passing passport instead of googleAuth
//* could probably just use passport.localstrat and just export passport
const { initialize, passport } = require("../passport-config");

//*initializing the local strategy with passport.. could be eliminated
initialize(passport);

//*google auth routes are on authRouter
const authRouter = require("./routers/auth-router");

const cardsRouter = require("./routers/cards-router/cards-router");
const usersRouter = require("./routers/users-router");
const topicsRouter = require("./routers/topics-router");
const server = express();

//* use JSON //
server.use(express.json());
// server.set("view-engine", "ejs");
server.use(express.urlencoded({ extended: false }));
server.use(flash());
server.use(
	session({
		//session takes various options
		// variables exist in the un-commited, secret .env file
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

// initialize is a function inside Passport library - see thread: https://stackoverflow.com/questions/46644366/what-is-passport-initialize-nodejs-express
server.use(passport.initialize());
//*google auth and local initialization ^^^^^
// configures passport to use express-sessions config object
// server.use(passport.session());

//* "Plug in" the routers here
server.use("/auth", authRouter);
server.use("/cards", cardsRouter);
server.use("/users", usersRouter);
server.use("/topics", topicsRouter);

//* base endpoint
server.get("/", (req, res) => {
	res.status(200).json({ message: "Up and Running..." });
});

module.exports = server;
