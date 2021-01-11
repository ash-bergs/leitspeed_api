/* -------------------------------------------------------------------------- */
/*                              Creating a Model                              */
/* The model assists the end points using SQL, these functions will be exported 
   and used in the users-router 
*/
/* -------------------------------------------------------------------------- */

const db = require("../../data/connection"); 

module.exports = {
    add, 
    find, 
    findById
}

function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(([id]) => {
            return findById(id); 
        }); 
}

function find() {
    return db('users'); 
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}

/* ----------------------- Trying to solve the problem ---------------------- */
//* I cannot add a user with the register end point. I don't know why this is... my GET end points are working. 
//* So I'm starting here in the model, so I can refactor the working end points to use the model - and see if the problem lies there. 
//TODO Add Find function, refactor get '/users' end point. 

//* I figured out my problem! And of course, it was a silly one. 
/* 
    Testing this out I used insomnia, with the address pointing to https://localhost:3000/users/ <- users router 
    when I was testing the register end point I didn't preceed '/register' with 'user'. Such a silly mistake. 
    Moral of the story, it's '/users/register' not just '/register'
*/