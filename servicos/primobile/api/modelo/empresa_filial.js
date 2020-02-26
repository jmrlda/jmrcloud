const mongoose = require( 'mongoose');

const FilialSchema = new mongoose.Schema({
    empresa: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empresa'
    },
    nome: {
        type: String,
    },

    ip: {
        type: String
    },
    usuarios: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Usuario'
        }
    ]
});


module.exports = mongoose.model('Filial', FilialSchema);