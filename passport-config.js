const LocalStrategy = require('passport-local').Strategy; 
const bcrypt = require('bcrypt'); 

function initialize(passport, getUser) {
    const authenticateUser = async (username, password, done) => {
        // ? I'm not sure what to do with this function... getUser
        // ? Can i use the model's .find function and match for username??
        // following this tutorial: https://www.youtube.com/watch?v=-RCnNyD0L-s
        const user = getUser(username)
        if (user == null) {
            // message will be displayed through the failureFlash property in the login route
            return done(null, false, { message: "No user with that username found" })
        }

        // if we get this far then we know a user has been found
        // now we must validate the password with bcrypt 
        try {
            // compare will compare the saved HASHED password, and the password the user has given after hashing 
            // these will always match if the right password is given
            if (await bcrypt.compareSync(password, user.password)) {
                // if this returns true, the user is authenticated 
                // return the user we want to authenticate with
                return done(null, user)
            } else {
                // users password didn't match hashed password in db 
                return done(null, false, { message: "Password incorrect" }); 
            }
        } catch (e){
            return done(e)
        }
    }
    passport.use(new LocalStrategy(authenticateUser));
    passport.serializeUser((user, done) => { });
    passport.deserializeUser((id, done) => { });
}

module.exports = initialize; 