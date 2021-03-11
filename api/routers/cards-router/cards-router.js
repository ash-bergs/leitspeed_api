const router = require('express').Router(); 
const cards = require('./cards-model'); 


// ✅ sanity checked
router.get('/', (req, res) => {
    cards.find()
        .then(cards => {
            res.status(200).json({ data: cards }); 
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        }); 
}) 


// ✅ sanity checked 
router.get('/:id', (req, res) => {
    const { id } = req.params;
    // call the database and the function built in the model - THEN use the Promise handling workflow! 
    cards.findById(id)
        .then(card => {
            res.status(200).json({ data: card }); 
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        }); 
})

// ✅ sanity checked 
router.post('/add-card', (req, res) => {
    // ? I can add the id on here /:id and attach it to the card, can't I? 
    // grab the card information the user submitted in the body 
    const card = req.body; 

    // call the db and the ADD function we defined to insert the new card into the Cards table 
    cards.add(card)
        .then(card => {
            res.status(201).json({ data: card }); 
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        }); 
})

// ! PUT endpoint 
// Put request ends in :id - a route paramter indicating the id of the card we wish to update 
// ✅ sanity checked 
router.put('/:id', (req, res) => {
    const { id } = req.params; 
    // the cards updates (changes) will be located on the body of the request
    const changes = req.body; 

    cards.update(changes, id)
        .then(newCard => {
            res.status(201).json(newCard); 
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        }); 
}) 

module.exports = router; 
