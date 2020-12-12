const express = require('express'); 

const server = express(); 

//* use JSON // 
server.use(express.json()); 

//* base endpoint 
server.get('/', (req, res) => {
    res.status(200).json({ message: "Up and Running..."}); 
})
