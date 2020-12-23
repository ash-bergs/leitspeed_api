/* -------------------------------------------------------------------------- */
/*                               About 01-users                               */
//! Command `knex seed:make 01-users` was given to create this file
// seeds are used to prepopulated databases with sample data
// it's a good idea to be in the habit of running `knex migrate:latest` before generating seed files 
// If there have been no changes, the above command will tell you you're up to date 
// File is named with a leading number '01' by convention, because seeds are not time stamped
//! When done run `knex seed:run` to add the data
//* Make sure you know the shape of your data! Do not add ids yourself, and keep code clean
//* If you decide to add more users later - this file can be directly edited to reflect that
// because of .truncate - everything will be reset, and there will not be duplicates
//! BUT WAIT - I just realized I didn't add a password field to the users! Let's go back and fix that first. 
/* ------------------------- How I fixed my mistake ------------------------- */
// First I ran `knex migrate:rollback', removing the users table I originally created
// Then I deleted the migration and created a new one - making sure the password was on there this time 🤦🏻‍♂️
/* -------------------------------------------------------------------------- */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  // used the `.truncate` method instead of `.del`
  // truncate gets rid of the standing users AND resets the primary keys 
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'Martin Jorgenson', 
          username: 'jorgensonsOrgan', 
          password: 'jorgenson',
          email: 'm.jorgs@gmail.com'
        },
        {
          name: 'Ashley Bergsma', 
          username: 'ashizbergs', 
          password: 'bergsma'
        }, 
        {
          name: 'Jessica Sheen', 
          username: 'jess_sheen', 
          password: 'sheen',
          email: 'jessica_sheen@gmail.com'
        }, 
        {
          name: 'Logan Johnson', 
          username: 'theDude', 
          password: 'johnson'
        }, 
      ]);
    });
};
