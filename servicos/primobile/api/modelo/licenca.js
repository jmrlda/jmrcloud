var mongoose = require('mongoose');


var LicencaSchema = new mongoose.Schema({
    payload : {
        type: String,
        required: true
    },
   
}, {
    timestamps: true
});

 
module.exports = mongoose.model('Licenca', LicencaSchema);
