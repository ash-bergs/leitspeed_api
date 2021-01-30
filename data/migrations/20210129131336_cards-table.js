
/* -------------------------------------------------------------------------- */
/*                            About the Cards Table                           */
/*  The shape of a Card Object looks like: 

    id: integer - primary key, 
    user_id: {}, 
    front: "string", 
    back: "string", 
    notes: "text", 
    public: boolean, 
    active: boolean
*/ 
//* Foreign Keys in Knex: Assign the key as an integer, then use unsigned (non-negative constraint), references (a Knex method)
//* and two methods to update and delete the Card Objects accordingly when a users id/data is updated/deleted 
/* -------------------------------------------------------------------------- */

exports.up = function(knex) {
  return knex.schema.createTable("cards", tbl => {
      tbl.increments()
      tbl.integer("user_id")
        .unsigned()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
      tbl.text("front", 999)
        .notNullable()
      tbl.text("back", 999)
        .notNullable()
      tbl.text("notes", 1200)
      tbl.boolean("active")
      tbl.boolean("public")
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("cards"); 
};
