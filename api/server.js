const express = require("express"); 

const server = express(); 

//* use JSON // 
server.use(express.json()); 

//* base endpoint 
server.get('/', (req, res) => {
    res.status(200).json({ message: "Up and Running..."}); 
})

//! Gotcha! 
// I forgot to export this module, and couldn't figure out why my server wasn't running! 
module.exports = server;