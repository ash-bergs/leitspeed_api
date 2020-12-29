/* -------------------------------------------------------------------------- */
/*                            About the Users table                           */
//! Knex command `knex migrate:make create-users-table` was given to create this file
//* This file serves as a snapshot - meaning it will not be changed after added 
//* But a rollback can be run to undo the creation of this table - `knex migrate:rollback`
//! Once completed and ready to add to the database, command `knex migrate:latest` was ran
//* The shape of the data looks like: 
// id: auto assigned 
// name: Text input for the user's name. Does not have to be unique. Required.
// username: Text input for a user's chosen handle, required and unique
// email: Optional text input if a user wishes to give an email address 
// password: not nullable 
/* -------------------------------------------------------------------------- */

// UP - the change we want to make to our schema 
exports.up = function(knex) {
    //* creating a table
    // all functionality to build tables is found on knex's `.schema` method 
    // we're chaning `.createTable`, which takes a name and a callback 
    return knex.schema.createTable('users', tbl => {
        // in the callback we can define what columns and constraints the table will have 
        // `.increments` is a method built into knex to auto assign ids 
        tbl.increments(); 
        // for another field, we select a data type, pass in the name & chain on constraints 
        tbl.text('name', 128)
            .notNullable(); 
        tbl.text('username', 128)
            .unique()
            .notNullable();
        tbl.text('password', 128)
            .notNullable();
        // this field has no constraints, other than the character limit we passed in (128)
        tbl.text('email', 128); 
    })
  
};

// DOWN - undoing a change to the schema 
// When we make a change to move our database forward, we need to prepare for backing up
// If a change isn't working, we should already have the logic to undo it written
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users'); 
};