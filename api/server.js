if (process.env.NODE_ENV !== 'production'){
    // checking the environment is not production to use dotenv 
    //? should it be pulled from index.js... or should this function be done there instead?
    require('dotenv').config(); 
}

const express = require('express'); 
// to query the database for the correct user in the initializePassport function... i need a connection to the users database 
const users = require('./routers/users-model'); 
const bcrypt = require('bcrypt'); 

//! passport 
// ? do these need to be moved after the routers?? 
const passport = require('passport'); 
const flash = require('express-flash'); 
const session = require('express-session'); 
const initializePassport = require('../passport-config'); 

// I know that the find function on the users-model returns an array of users... 
// I might need to further filter upon return 
initializePassport(
    passport, 
    username => users.find(user => user.username === username), 
    // id for the deserializeUser function in passport-config.js
    id => users.findById(id))

// helper functions to check Passport authentication status 
//TODO move these to their own file and import them (clean code!)

const cardsRouter = require('./routers/cards-router/cards-router'); 
const usersRouter = require('./routers/users-router'); 
const topicsRouter = require('./routers/topics-router'); 
const server = express(); 

//* use JSON // 
server.use(express.json()); 
server.set('view-engine', 'ejs')
server.use(express.urlencoded({ extended: false })); 
server.use(flash()); 
server.use(session({
    //session takes various options 
    // variables exist in the un-commited, secret .env file 
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false
})); 
// initialize is a function inside Passport library - see thread: https://stackoverflow.com/questions/46644366/what-is-passport-initialize-nodejs-express
server.use(passport.initialize()); 
// configures passport to use express-sessions config object 
server.use(passport.session());

//* "Plug in" the routers here
server.use('/cards', cardsRouter);
server.use('/users', usersRouter);  
server.use('/topics', topicsRouter); 

// adding to the spaghetti code with some shot-in-the-dark endpoints to test passport 
// GET register 
//* the REGISTER end points seem to be working! a user is added with a hashed password 
server.get('/register', (req, res) => {
    res.render('register.ejs')
})

server.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.add({name: req.body.name, username: req.body.username, password: hashedPassword, email: req.body.email})
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

//TODO now... to tackle login
server.get('/login', (req, res) => {
    res.render('login.ejs')
})

// we'll call passport to handle a login! see passport-config if curious what it's up to
server.post('/login', passport.authenticate('local', {
    successRedirect: '/', 
    failureRedirect: '/login', 
    failureFlash: true
}))

//* base endpoint 
server.get('/', (req, res) => {
    res.render('index.ejs')
    //res.status(200).json({ message: "Up and Running..."}); 
})

module.exports = server;