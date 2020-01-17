const express = require('express');

const server = express();

server.use(express.json());
server.use(logger);

//custom middleware
function logger(req, res, next) {
    console.log(` [${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
    next();
};

module.exports = server;