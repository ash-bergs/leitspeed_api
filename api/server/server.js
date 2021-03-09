const express = require("express");

const apiRouter = require("./router");
const configMid = require("./serverConfig");
const server = express();

configMid(server);
server.use("/api", apiRouter);

module.exports = server;
