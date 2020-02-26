const express        = require('express');
const server         = express();
const empresa        = require('../controlo/empresa');
const empresa_filial = require('../controlo/empresa_filial');

// .Empresas
server.post('/empresas/', empresa.create);
server.get('/empresas/', empresa.find);
// ./Empresas

// .Filiais
server.post('/filial/:id', empresa_filial.create);
server.get('/filial/', empresa_filial.find);
// /.Filiais


module.exports = server;