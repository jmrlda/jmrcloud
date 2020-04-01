const express        = require('express');
const server         = express();
const path            = require('path');

server.get('/teste', ( req, res ) => {
    res.sendFile(__dirname + path.normalize('/view/index.html'));
});

module.exports = server;