const knex = require("knex");

//* Imports the knex configuration we built before
const config = require("../knexfile");

const environment = process.env.NODE_ENV || "development";

module.exports = knex(config[environment]);

/* -------------------------------------------------------------------------- */
/*                             About connection.js                            */
/* With this file our application has a way to connect to the database, and to information about the environment it will be running in
/* -------------------------------------------------------------------------- */
