const express        = require('express');
const body_parser    = require( 'body-parser')
const methodOverride = require('method-override');
const cors           = require('cors');
const server         = express();
const mongoose       = require('./servicos/primobile/api/basedados/mongo');
const path            = require('path');


server.set('view engine', 'ejs');
server.use(express.static(path.join(__dirname, 'public')));
server.set('views', path.join(__dirname, 'views'));
/* importar rotas */

// rotas front-end
const index_rota     = require('./rota/index');

// rota de servicos api
const empresa_rota   = require('./servicos/primobile/api/rota/empresa');
const usuario_rota   = require('./servicos/primobile/api/rota/usuario');

/* ./importar rotas */



server.use( body_parser.json()); // aceitar apenas codificacao JSON
server.use(cors()); //  cross-origin resource sharing
server.use( body_parser.urlencoded({ extended : true}));
server.use(methodOverride('_method')); // usar metodos como PUT, DELETE
server.use(index_rota);
server.use(empresa_rota);
server.use(usuario_rota);

const port = 4000;

server.listen(port, () => {
    console.log(`Servidor executando na porta: ${port}`);
});