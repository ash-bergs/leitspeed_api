const express = require("express");

const authRouter = require("./routers/auth-router");
const cardsRouter = require("./routers/cards-router/cards-router");
const usersRouter = require("./routers/users-router");
const topicsRouter = require("./routers/topics-router");
const server = express();
server.use(express.json());
//* use JSON //

//* passport requirements
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const auth = require("../passport-google");
const googleRouter = require("./routers/google-router");
// //* setting view engine for ejs?? this is for the sake of learning passport and may be removed

// //* changed ejs to hbs already had it built out
server.set("view engine", "hbs");
server.set("views", path.join(__dirname, "views"));

server.use(cookieParser());
server.use(
	session({
		secret: process.env.SESSION_KEY,
		resave: false,
		saveUninitialized: false,
	})
);

// Passport/session initialization
server.use(auth.passport.initialize());
server.use(auth.passport.session());

// Set static files to folder /public
server.use(express.static(__dirname + "/public"));

server.use("/", googleRouter);

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
