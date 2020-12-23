const knex = require ('knex'); 

//* Imports the knex configuration we built before
const knexfile = require('../knexfile'); 

const environment = process.env.NODE_ENV || 'development'; 

const config = knexfile[environment]; 

module.exports = knex(config); 

/* -------------------------------------------------------------------------- */
/*                             About connection.js                            */
/* With this file our application has a way to connect to the database
   Now we have to write endpoints, now that they can actually access the info
   that we've created there - now I will build some users end points
   
   
   /* [GET] all users, [GET] users by id, [POST] new user, [PUT] edit user information 
   * Location: api/users/users-router.js */
/* -------------------------------------------------------------------------- */