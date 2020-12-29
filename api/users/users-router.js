//? This instantiates the router that we will export below ?(is this the correct wording?)
const router = require('express').Router(); 

//* Imports the connection to the database - can be named whatever 
// this is what we will call to 'call the database'
const db = require('../../data/connection'); 

// below are the end points, organized by http method alphabetically 
// these end points are for CRUD operation on the *USERS* table in the database 

//TODO [🦄] Delete a user 

//* Get all users 
router.get('/', (req, res) => {
    db('users')
        // these functions are *promises*
        .then(users => {
            res.status(200).json({ data: users }); 
        })
        .catch(handleError);
}); 

//* Get user by id {dynamic param}
router.get('/:id', (req, res) => {

    db('users')
    // Search the users table where this id first occurs, then....
        .where({ id: req.params.id }).first()
        .then(user => {
            if (user) {
                res.status(200).json({ data: user }); 
            } else {
                res.status(404).json({ message: 'User not found' }); 
            }
        })
        .catch(handleError)
});

//* Post a new user 

router.post('')

/* --------------------------- Note on Middleware --------------------------- */
//* We could use a handleError function to handle errors, perhaps logging them, and pass it to the catch clause. 
//TODO [🦄] Make this more robust, handle saving errors somewhere to see later? How can I do that? 

function handleError(error) {
    res.status(500).json({ message: error.message }); 
}

/* ----------------------- tips for writing end points ---------------------- */
// start the statement in total but empty to start
//* db('users').then().catch() for example - helps keep in mind promise rules

//! Don't forget to export & import into server.js
module.exports = router;
