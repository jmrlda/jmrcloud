var mongoose = require('mongoose');
var crypto = require('crypto');

var UsuarioSchema = new mongoose.Schema({
    usuario:  {
        type: String,
        required: true,
        unique: true
    },
    nome : {
        type: String,
        required: true,
        unique: true
    },

    perfil: {
        type: String,
    },

    documento: {
        type: String
    },



    empresa_filial: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Filial'
    },
    hash:  {
        type: String,
        required: true
    },
    salt:  {
        type: String,
        required: true
    }

});


// Metodo para definir 'salt' e 'hash' da senha para usuario
// setSenha primeiramente cria 'salt' unico para todos usuarios
// depois faz  hash do 'salt' com a senha do usuario e gera o 'hash'
// o hash sera armazenado na base de dados como senha
UsuarioSchema.methods.setSenha = function( senha ) {
    // criar 'salt' unico para cada usuario
    this.salt = crypto.randomBytes(16).toString('hex');
    // hashing 'salt' do usuario e senha com 1000 iteracoes, tamanho 64 e sha512 digest

    this.hash = crypto.pbkdf2Sync(senha, this.salt, 1000, 64, `sha512`).toString(`hex`);
};

// Metodo para verificar se a senha introduzida esta correto 
// leva a senha introduzida e o salt da base de dados do usuario
// e faz o hashes e verifica se o hash gerado eh igual ao hash armazenado 
// e assim for igual a senha esta correcto caso contrario erro.

UsuarioSchema.methods.validarSenha = function( senha ) {
    var hash = crypto.pbkdf2Sync(senha,
        this.salt, 1000, 64, `sha512`).toString(`hex`);
        return this.hash === hash
};

 
module.exports = mongoose.model('Usuario', UsuarioSchema);
