const mongoose       = require('mongoose');
const dotenv         = require('dotenv');



dotenv.config(); // configuracao e conexao base dados

// var dbUrl = 'mongodb+srv://primobile:'+ encodeURIComponent("#JMR2013!") +'@cluster0-0cbdc.gcp.mongodb.net/jmrcloud?retryWrites=true&w=majority';
var dbUrl = 'mongodb+srv://primobile:'+ encodeURIComponent("#JMR2013!") +'@cluster0-0cbdc.gcp.mongodb.net/jmrcloud?retryWrites=true&w=majority'
// console.log('URI ', process.env.MONGO_URI);
mongoose
    .connect( dbUrl,  { useNewUrlParser: true})
    .then(() => console.log('BD conectado'))
    .catch((err) => console.log('Ocorreu um erro', err));

mongoose.connection.on('error', err => {
    console.log(`DB erro de conexao: ${err.message}`);
});

module.exports = mongoose;