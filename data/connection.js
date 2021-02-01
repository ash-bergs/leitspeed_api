const knex = require ('knex'); 

//* Imports the knex configuration we built before
const knexfile = require('../knexfile'); 

const environment = process.env.DB_ENV || 'development'; 

const config = knexfile[environment]; 

module.exports = knex(config); 

/* -------------------------------------------------------------------------- */
/*                             About connection.js                            */
/* With this file our application has a way to connect to the database, and to information about the environment it will be running in
/* -------------------------------------------------------------------------- */