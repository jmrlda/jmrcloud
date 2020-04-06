var mongoose = require('mongoose');


var LicencaSchema = new mongoose.Schema({

    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empresa',
        required: true

    },
    filial: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Filial',
        required: true

    },
    sistema : {
        type: String,
        required: true
    },    
    
    duracao : {
        type: Number,
        required: true
    },    

    data_criacao : {
        type: Date,
        required: false
    },
    data_activacao : {
        type: Date,
        required: false
    },
    data_final : {
        type: Date,
        required: false
    },

    data_criacao : {
        type: Date,
        default: Date.now(),
        required: false
    },
    estado : {
        type: String,
        required: true
    },


    payload : {
        type: String,
        required: false
    },
   
}, {
    timestamps: true
});

 
module.exports = mongoose.model('Licenca', LicencaSchema);
