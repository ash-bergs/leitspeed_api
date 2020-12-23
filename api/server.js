const express = require("express"); 

const usersRouter = require('./users/users-router'); 
const server = express(); 

//* use JSON // 
server.use(express.json()); 

//* "Plug in" the users router 
server.use('/users', usersRouter); 

//* base endpoint 
server.get('/', (req, res) => {
    res.status(200).json({ message: "Up and Running..."}); 
})

//! Gotcha! 
// I forgot to export this module, and couldn't figure out why my server wasn't running! 
module.exports = server;