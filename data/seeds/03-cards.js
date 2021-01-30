
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cards').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cards').insert([
        {
          user_id: 1, 
          front: "What is a bit? How do they relate to a programming language like JavaScript?", 
          back: "A bit is 'any two valued thing.' We think of them with 0s and 1s, like a decimal number, but instead of 10 digits we have 2. Any discrete piece of information can be represented in bits - in a sequence of 1s and 0s.", 
          notes: "The values in JS are made up of bits - numbers, strings, decimals, are organized chunks of bits that contain a value, and information about the value. Bits are the atoms we build with in a programming language.", 
          active: true, 
          public: true
          },
          {
          user_id: 4, 
          front: "How can you quickly generate an array of all an object's keys in string form?", 
          back: "The keys of an object can be return by passing the object into the Object.keys() method", 
          notes: "This method doesn't return the keys in any particular order", 
          active: true, 
          public: true
          }, 
          {
          user_id: 2, 
          front: "What does padding refer to in CSS?", 
          back: "Padding refers to the space between and elements content and its border",  
          active: true, 
          public: true
          }, 
          {
          user_id: 3, 
          front: "What is the RegEx wildcard operator?", 
          back: "A period, for example: '/.ucks/ig' would match any letter (d, l, f, etc) and return true for a match", 
          notes: "Matches for any letter",
          active: true, 
          public: true
          }
      ]);
    });
};


/* ------------------------------ Note to self ------------------------------ */
//* I used the word "public" for the public status of a card object (true or false)
// This field makes sense to have - but public is a reserved word in some programming languages. 
// I was worried it would cause errors in these seeds, but it didn't. 
//! I should be mor mindful of these things in the future though 