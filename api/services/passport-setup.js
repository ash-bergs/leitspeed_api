// the passport core 
const passport = require('passport'); 
// the Google 'strategy' 
const GoogleStrategy = require('passport-google-oauth20'); 

// takes two parameters - stategy, 
passport.use(
    new GoogleStrategy({
        //* takes in an options object 
        // setting up the googlePlus api to use it in this project 
        //* -> head to the developer's console at GoogleAPI's website 
        // created api: leitspeed-study (https://console.cloud.google.com/apis/dashboard?pli=1&project=leitspeed-study&supportedpurview=project) 
        
    }), () => {
        // passport callback function
        // will fire sometime during the authentication process
    }
)