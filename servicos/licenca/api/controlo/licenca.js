const Licenca = require('../modelo/licenca');


module.exports = {
    create: async ( req, res ) => {
      try {
        console.log('dentro create licenca');
        const { cliente, filial, sistema, duracao, estado } = req.body;
        console.log(req.body)
        const _licenca = await Licenca.create({
          cliente,
            filial,
            sistema,
            duracao,
            estado
        });
        return res.send({erro: null, resultado: _licenca});                        
          
      } catch (error) {
        return res.send({erro: error, resultado: null});                        

      }
    },

    find: async ( req, res ) => {
        try {
            const licencas = await Licenca.find().populate('cliente').populate('filial');
            return res.send({erro: null, resultado: licencas});                        

        } catch (error) {
            return res.send({erro: error, resultado: null});                        

        }
    },




    findById: async ( req, res ) => {
      try {
       const { id } = req.params;
       const licenca = await Licenca.findById(id).populate('cliente').populate('filial');    
       return res.send({erro: null, resultado: licenca});                        
      } catch (error) {
       return res.send({erro: error, resultado: null});                        

      }

   },


   update: async ( req, res ) => {
    try {
     const { id } = req.params;
     const { cliente, filial, sistema, duracao, estado, data_activacao, data_final } = req.body;

     const filtro = {'_id' : id};
     const update = {
      cliente:cliente,
      filial:filial,
      sistema:sistema,
      duracao:duracao,
      estado:estado,
      data_activacao:data_activacao, 
      data_final:data_final
     }
     await Licenca.findOneAndUpdate(filtro, update);
     var lic = await Licenca.findOne(filtro).populate('cliente').populate('filial');
     console.log('update sucesso')
     return res.send({erro: null, resultado: lic});                        
    } catch (error) {
      console.log('erro update');
      console.log(error);
 
      return res.send({erro: error, resultado: null});                        

    }

 },


 delete: async (req, res) => {
  const { id } = req.params;
  console.log('delete licenca id  ' + id);

  try {
    const licenca = await Licenca.deleteOne({'_id' : id}, function( err ) {
      if ( err ) {
        return res.send({
          erro: err,
          resultado: null
        });
  
      }

    });
    return res.send({
      erro: null,
      resultado: 'sucesso'
    });

  } catch (error) {
    return res.send({
      erro: error,
      resultado: null
    });
  }
},


}