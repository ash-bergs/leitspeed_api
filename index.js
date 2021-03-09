require("dotenv").config();
const server = require("./api/server");
// * bringing dotenv in

//* now switch this to the .env var, brought in by dotenv .config()
const port = process.env.PORT || 5255;

server.listen(port, () => console.log(`Server running on ${port}`));
