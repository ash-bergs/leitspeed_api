/* -------------------------------------------------------------------------- */
/*                           About the Topics table                           */
/* The topics table contains groups created to organize flashcards.
    Users can organize their notes by topic - coding, history, crafting, whatever
    
    The shape of this information looks like: 
    id: auto increments 
    name: string - limit to 50 characters - required 
    
    This table seems simple, but it is done so intentionally to separate concerns
    topics will be connected to users and cards through an intermediary table 
                                                                                */
/* -------------------------------------------------------------------------- */

exports.up = function(knex) {
    return knex.schema.createTable('topics', tbl => {
        tbl.increments(); 
        tbl.string('name', 50)
            .notNullable(); 
    });
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('topics'); 
};
