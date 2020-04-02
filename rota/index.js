const express        = require('express');
const server         = express();
const path            = require('path');

server.get('/', ( req, res ) => {
    res.render('paginas/index', {
        title: "JMRcloud Dashboard",
        isActive: "dashboard"
    });
});

server.get('/clientes', ( req, res ) => {
    res.render('paginas/cliente/cliente', {
        title: "Clientes",
        isActive: "clientes"
    });
});

server.get('/clientes/novo', ( req, res ) => {
    res.render('paginas/cliente/cliente_crud', {
        title: "Clientes",
        isActive: "clientes"
    });
});

server.get('/servicos', ( req, res ) => {
    res.render('paginas/servicos', {
        title: "Servicos",
        isActive: "servicos"
    });
});


server.get('/aplicacao', ( req, res ) => {
    res.render('paginas/aplicacao', {
        title: "apliacao",
        isActive: "aplicacao"
    });
});


module.exports = server;