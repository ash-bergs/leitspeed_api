const server = require("./api/server/server");
// * bringing dotenv in
require("dotenv").config();
//* now switch this to the .env var, brought in by dotenv .config()
const port = process.env.PORT || 5255;

server.listen(port, () => console.log(`Server running on ${port}`));
