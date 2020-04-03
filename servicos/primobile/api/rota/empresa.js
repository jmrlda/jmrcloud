const express        = require('express');
const server         = express();
const empresa        = require('../controlo/empresa');
const empresa_filial = require('../controlo/empresa_filial');

// .Empresas
server.post('/empresas/', empresa.create);
server.post('/empresas/:id', empresa.update);

server.get('/empresas/', empresa.find);
server.get('/empresas/:id', empresa.findEmpresaById);

server.get('/empresas/delete/:id', empresa.delete);

// ./Empresas

// .Filiais
server.get('/filial/', empresa_filial.find);
server.post('/filial/:id', empresa_filial.create);
server.get('/filial/delete/:id', empresa_filial.delete);

// /.Filiais


module.exports = server;