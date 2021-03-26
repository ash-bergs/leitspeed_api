const jwt = require("jsonwebtoken");

const secret = process.env.TOKEN_SECRET;

module.exports = (user) => {
	console.log(user);
	const payload = {
		id: user.id,
		username: user.username,
	};

	const options = { expiresIn: "2d" };

	return jwt.sign(payload, secret, options);
};
