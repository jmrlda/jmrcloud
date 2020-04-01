const express        = require('express');
const server         = express();
const path            = require('path');

server.get('/', ( req, res ) => {
    res.render('paginas/index');
});
module.exports = server;