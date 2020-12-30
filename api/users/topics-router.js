const router = require('express').Router(); 

const db = require('../../data/connection'); 

//* Get all users 
router.get('/', (req, res) => {
    db('topics')
        .then(topics => {
            res.status(200).json({ data: topics }); 
        })
        .catch(error => {
            res.status(500).json({ message: error.message }); 
        })
})

module.exports = router; 