const server = require('./api/server'); 

// * bringing dotenv, using the config method it will bring in the declarations in finds in the `.env` file in the root of the project (not committed, private!)
require('dotenv').config(); 
//* now switch this to the .env variable, brought in by dotenv .config()
const port = process.env.PORT || 3000; 

server.listen(port, () => console.log(`Server running on ${port}`));