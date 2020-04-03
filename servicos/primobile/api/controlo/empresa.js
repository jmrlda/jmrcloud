const Empresa = require('../modelo/empresa');


module.exports = {
    create: async ( req, res ) => {
      try {
        console.log('dentro create empresa');
        const { empresa, nome, descricao, nuit } = req.body;
        console.log(req.body)
        const _empresa = await Empresa.create({
          empresa,
            nome,
            descricao,
            nuit
        });
        return res.send({erro: null, resultado: _empresa});                        
          
      } catch (error) {
        return res.send({erro: error, resultado: null});                        

      }
    },

    find: async ( req, res ) => {
        try {
            const empresa = await Empresa.find();
            return res.send({erro: null, resultado: empresa});                        

        } catch (error) {
            return res.send({erro: error, resultado: null});                        

        }
    },

  //   findById: async ( req, res ) => {
  //     try {
  //         const empresa = await Empresa.find();
  //         return res.send({erro: null, resultado: empresa});                        

  //     } catch (error) {
  //         return res.send({erro: error, resultado: null});                        

  //     }
  // },

    filialByEmpresa: async ( req, res ) => {
       try {
        const { id } = req.params;
        const empresa = await Empresa.findById(id).populate('filial');    
        return res.send({erro: null, resultado: empresa});                        
       } catch (error) {
        return res.send({erro: error, resultado: null});                        

       }

    },


    findEmpresaById: async ( req, res ) => {
      try {
       const { id } = req.params;
       const empresa = await Empresa.findById(id).populate('filial');    
       return res.send({erro: null, resultado: empresa});                        
      } catch (error) {
       return res.send({erro: error, resultado: null});                        

      }

   },


   update: async ( req, res ) => {
    try {
     const { id } = req.params;
     const { empresa, nome, descricao, nuit } = req.body;

     const filtro = {'_id' : id};
     const update = {
      empresa : empresa,
      nome : nome,
      descricao: descricao,
      nuit: nuit
     }
     await Empresa.findOneAndUpdate(filtro, update);
     var emp = await Empresa.findOne(filtro);
    //  console.log('empresa');
    //  console.log(emp);
     return res.send({erro: null, resultado: emp});                        
    } catch (error) {
      console.log('erro update');
      console.log(error);
 
      return res.send({erro: error, resultado: null});                        

    }

 },


 delete: async (req, res) => {
  const { id } = req.params;
  console.log('delete id  ' + id);

  try {
    const empresa = await Empresa.deleteOne({'_id' : id}, function( err ) {
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