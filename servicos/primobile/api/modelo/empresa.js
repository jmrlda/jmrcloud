var mongoose = require('mongoose');


var EmpresaSchema = new mongoose.Schema({
    nome : {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: false
    },
    filial: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Filial'
        }
    ]

});

 
module.exports = mongoose.model('Empresa', EmpresaSchema);
