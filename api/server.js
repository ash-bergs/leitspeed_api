const express = require("express"); 

const authRouter = require('./routers/auth-router'); 
const cardsRouter = require('./routers/cards-router/cards-router'); 
const usersRouter = require('./routers/users-router'); 
const topicsRouter = require('./routers/topics-router'); 
const server = express(); 

// //* setting view engine for ejs?? this is for the sake of learning passport and may be removed
server.set('view engine', 'ejs'); 
//* use JSON // 
server.use(express.json()); 

//* "Plug in" the routers here
server.use('/auth', authRouter); 
server.use('/cards', cardsRouter);
server.use('/users', usersRouter);  
server.use('/topics', topicsRouter); 

//* base endpoint 
server.get('/', (req, res) => {
    res.status(200).json({ message: "Up and Running..."}); 
})

module.exports = server;