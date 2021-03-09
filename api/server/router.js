const router = require("express").Router();

const cardsRouter = require("../users/cards-router");

router.use("/cards", cardsRouter);

router.get("/", (req, res) => {
	res.json({ api: "You figured it out!" });
});

module.exports = router;
