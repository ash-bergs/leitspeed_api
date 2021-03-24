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
    findById, 
    findByUsername
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

//TODO (ash branch: 'fix/authentication-passportJS') fix or purge
function findByUsername(username) {
    return db('users')
        .where({ username })
        .first(); 
}
