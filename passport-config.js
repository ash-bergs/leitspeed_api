const LocalStrategy = require('passport-local').Strategy; 
const bcrypt = require('bcrypt'); 

function initialize(passport) {
    const authenticateUser = (username, password, done) => {
        //! this function needs to be built (getUserbyUsername)
        const user = getUserByUsername(username)
        if (user == null) {
            return done(null, false, { message: "No user with that username found" })
        }

        // if we get this far then we know a user has been found
        // now we must validate the password with bcrypt 
        try {
            if (await bcrypt.compareSync)
        } catch {

        }
    }
    passport.use(new LocalStrategy(), authenticateUser)
    passport.serializeUser((user, done) => { })
    passport.deserializeUser((id, done) => { })
}
