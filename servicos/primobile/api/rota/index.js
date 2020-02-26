const express        = require('express');
const server         = express();


server.get('/', ( req, res ) => {
    res.sendFile(__dirname + '/index.html');
});

module.exports = server;