const express        = require('express');
const server         = express();
const licenca        = require('../controlo/licenca');

// .licenca
server.post('/servicos/licenca/', licenca.create);
server.post('/servicos/licenca/:id', licenca.update);

server.get('/servicos/licenca/', licenca.find);
server.get('/servicos/licenca/:id', licenca.findById);

server.get('/servicos/licenca/delete/:id', licenca.delete);

// ./licenca

module.exports = server;