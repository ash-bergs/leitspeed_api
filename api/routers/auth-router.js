//* all authentication routes (via passport) live here - for the time being Google is being used at the only 'strategy'

//* create an instance of an express router 
const express = require('express');
const router = express.Router(); 

// base 
router.get('/', (req, res) => {
    res.render('index')
})

// auth login 
router.get('/login', (req, res) => {
    // ? at the point, if a user were to login, the desired behavior would be to send them to the dashboard - how to implement that here? 
    // it seems more like a front end job...
    res.render('login'); 
})

// logout 
router.get('/logout', (req, res) => {
    // set up
    // handle with passport
    res.send("logging out");
})


router.get('/google', (req, res) => {
    // set up 
    // handle with passport 
    res.send("logging in with google");
})

module.exports = router; 