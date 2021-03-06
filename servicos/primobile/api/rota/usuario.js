const express        = require('express');
const server         = express();
const usuario        = require('../controlo/usuario')


server.get('/usuarios/', usuario.find);
server.get('/usuarios/:id', usuario.findById); // :id = filial id
server.post('/usuarios/login', usuario.login);
server.post('/usuarios/alterarsenha', usuario.updateSenha);

server.post('/usuarios/:id', usuario.create); // :id = filial id
server.get('/usuarios/existe/:id', usuario.findByUsuario); // :id = filial id

// server.put('/usuarios/:id'); // :id = filial id
// server.delete('/usuarios/:id'); // :id = filial id
// fim route



module.exports = server;