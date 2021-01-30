const router = require('express').Router(); 

//TODO - Make a cards model! 
const cards = require('./cards-model'); 

//* GET all cards 
router.get('/', (req, res) => {
    cards.find()
        .then(cards => {
            res.status(200).json({ data: cards }); 
        })
        .catch(handleError); 
}); 

router.get('/:id', (req, res) => {
    const { id } = req.params;
    // call the database and the function built in the model - THEN use the Promise handling workflow! 
    cards.findById(id)
        .then(card => {
            res.status(200).json({ data: card }); 
        })
        .catch(handleError); 
})



//TODO SET THIS DAMN FUNCTION UP IN A MODULAR WAY - refator routers to reflect that 
function handleError(error) {
    res.status(500).json({ message: error.message }); 
}

module.exports = router; 

//? How can I make a function that lets a user know when a card with a certain ID doesn't exist? 