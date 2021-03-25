const LocalStrategy = require('passport-local').Strategy; 
const bcrypt = require('bcrypt'); 
const users = require('./api/routers/users-model'); 

// just passing singular paramter of passport 
function initialize(passport) {

    const authenticateUser = (username, password, done) => {
        // ? I'm not sure what to do with this function... getUser
        // ? Can i use the model's .find function and match for username??
        // following this tutorial: https://www.youtube.com/watch?v=-RCnNyD0L-s
        users.findByUsername(username)
            .then(user => {
                if (user == null) {
                    // message will be displayed through the failureFlash property in the login route
                    return done(null, false, { message: "No user with that username found" })
                } else {
                    if (bcrypt.compareSync(password, user.password)) {
                        // if this returns true, the user is authenticated 
                        // return the user we want to authenticate with
                        return done(null, user)
                    } else {
                        // users password didn't match hashed password in db 
                        return done(null, false, { message: "Password incorrect" }); 
                    }
                }
            })
            .catch(error => done(error))
    }
    passport.use(new LocalStrategy(authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        users.findById(id)
            .then(user => {
                return done(null, user);
            })
    });
}

module.exports = initialize; 