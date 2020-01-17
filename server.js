const express = require('express');

//---------------Router----------------------------------
const actionsRouter = require('./api/actionsRouter');
const projectRouter = require('./api/projectRouter');

const server = express();

//---------------server.use()----------------------------------
server.use(express.json());
server.use(logger);
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectRouter);

//---------------server.use(Route not available)----------------------------------
server.use((req, res) => {
    res.send(`<h2>Route does not exist</h2><p>Please refer to the documentation.</p>`);
})


//---------------middleware----------------------------------
function logger(req, res, next) {
    console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`)
    next();
};

module.exports = server;