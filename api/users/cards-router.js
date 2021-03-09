const router = require("express").Router();
const cards = require("./cards-model");

//* GET all cards
router.get("/", (req, res) => {
	cards
		.find()
		.then((cards) => {
			res.status(200).json({ data: cards });
		})
		.catch(handleError);
});

router.get("/:id", (req, res) => {
	const { id } = req.params;
	// call the database and the function built in the model - THEN use the Promise handling workflow!
	cards
		.findById(id)
		.then((card) => {
			res.status(200).json({ data: card });
		})
		.catch(handleError);
});

router.post("/add-card", (req, res) => {
	// ? I can add the id on here /:id and attach it to the card, can't I?
	// grab the card information the user submitted in the body
	const card = req.body;

	// call the db and the ADD function we defined to insert the new card into the Cards table
	cards
		.add(card)
		.then((card) => {
			// ? is 201 the correct "created" status?
			res.status(201).json({ data: card });
		})
		.catch(handleError);
});

//TODO SET THIS DAMN FUNCTION UP IN A MODULAR WAY - refator routers to reflect that
function handleError(error) {
	res.status(500).json({ message: error.message });
}

module.exports = router;

//? How can I make a function that lets a user know when a card with a certain ID doesn't exist?
