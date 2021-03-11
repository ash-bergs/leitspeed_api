const db = require("../../../data/connection"); 

//? What will this model need to let us do? 
// FIND cards ✅
// FIND a card by user_id ? 
// FIND a card by its ID ✅
// ADD a card ✅
// DELETE a card 
// UPDATE a card 

module.exports = {
    add,
    find, 
    findById, 
    update
}

function find() {
    return db('cards'); 
}

function findById(id) {
    return db('cards')
        .where({ id })
            .first(); 
}

function add(card) {
    return db('cards')
        .insert(card, 'id')
            .then(([id]) => {
                return findById(id); 
            }); 
}

// with the findById function inplace, we can use a similar logic and method to update something that already exists 
function update(changes, id) {
    return db('cards')
    // to update a card first find the the record where the id passed in occurs 
        .where({ id })
        // update the necessary fields, retaining the un-changed values
            .update(changes)
            .then(() => {
                // return the updated item (with changes)
                return findById(id);
    }); 
}