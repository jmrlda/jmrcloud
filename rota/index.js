const express        = require('express');
const server         = express();
const path            = require('path');
const request         = require('request');
const reqpromise       = require('request-promise');

server.get('/', ( req, res ) => {
    res.render('paginas/index', {
        title: "JMRcloud Dashboard",
        isActive: "dashboard"
    });
});


// clientes
server.get('/clientes', ( req, res ) => {
    res.render('paginas/cliente/cliente', {
        title: "Clientes",
        isActive: "clientes"
    });
});

server.get('/clientes/novo', ( req, res ) => {
    res.render('paginas/cliente/cliente_crud', {
        title: "Clientes",
        isActive: "clientes",
        cliente: null,
        btnCreateLabel: 'Criar cliente'
    });
});


server.get('/clientes/:id', async ( req, res ) => {

    var id = req.params.id;
    console.log('id : ' + id);
    var data = null;
    var opcao = {
        uri: 'http://127.0.0.1:4000/empresas/' + id,
        json: true
    }

    reqpromise(opcao)
        .then((cliente) =>{
            console.log('sucesso');
            console.log(cliente);

            if ( cliente.erro == null ) {
                res.render('paginas/cliente/cliente_crud', {
                    title: "Clientes",
                    isActive: "clientes",
                    cliente: cliente.resultado,
                    btnCreateLabel: 'Salvar cliente'

                });
    
            } else {
                res.render('paginas/cliente/cliente_crud', {
                    title: "Clientes",
                    isActive: "clientes",
                    cliente: null,
                    btnCreateLabel: 'Salvar cliente'
                });
    
            }
        })
        .catch((err)=> {

            console.log('erro');
            console.log(err);
            res.render('paginas/cliente/cliente_crud', {
                title: "Clientes",
                isActive: "clientes",
                cliente: null,
                btnCreateLabel: 'Salvar cliente'

            });
        });

   
});



// ./clientes



// servicos
// server.get('/servicos', ( req, res ) => {
//     res.render('paginas/servicos', {
//         title: "Servicos",
//         isActive: "servicos"
//     });
// });

// ./servicos


// aplicacao
server.get('/aplicacao', ( req, res ) => {
    res.render('paginas/aplicacao', {
        title: "apliacao",
        isActive: "aplicacao"
    });
});

// ./aplicacao



// licenca
server.get('/licenca', ( req, res ) => {
    res.render('paginas/licenca/licenca', {
        title: "licenca",
        isActive: "licenca"
    });
});


server.get('/licenca/novo', ( req, res ) => {
    res.render('paginas/licenca/licenca_crud', {
        title: "Nova licenca",
        isActive: "licenca",
        licenca: null,
        btnCreateLabel: 'Criar licenca'
    });
});


server.get('/licenca/:id', async ( req, res ) => {

    var id = req.params.id;
    console.log('licenca id : ' + id);
    var data = null;
    var opcao = {
        uri: 'http://127.0.0.1:4000/servicos/licenca/' + id,
        json: true
    }

    reqpromise(opcao)
        .then((licenca) =>{
            console.log('sucesso');
            console.log(licenca);

            if ( licenca.erro == null ) {
                res.render('paginas/licenca/licenca_crud', {
                    title: "licenca editar",
                    isActive: "licenca",
                    licenca: licenca.resultado,
                    btnCreateLabel: 'Salvar licenca'

                });
    
            } else {
                res.render('paginas/licenca/licenca_crud', {
                    title: "licenca editar",
                    isActive: "licenca",
                    licenca: licenca.resultado,
                    btnCreateLabel: 'Salvar licenca'
                });
    
            }
        })
        .catch((err)=> {

            console.log('erro');
            console.log(err);
            res.render('paginas/licenca/licenca_crud', {
                title: "licenca editar",
                isActive: "licenca",
                licenca: licenca.resultado,
                btnCreateLabel: 'Salvar licenca'

            });
        });

   
});

// ./licenca

module.exports = server;