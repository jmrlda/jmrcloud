const Empresa = require('../modelo/empresa');


module.exports = {
    create: async ( req, res ) => {
      try {
        console.log('dentro create empresa');
        const { nome, descricao } = req.body;
        console.log(req.body)
        const empresa = await Empresa.create({
            nome,
            descricao
        });
        return res.send({erro: null, resultado: empresa});                        
          
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

    filialByEmpresa: async ( req, res ) => {
       try {
        const { id } = req.params;
        const empresa = await Empresa.findById(id).populate('filial');    
        return res.send({erro: null, resultado: empresa});                        
       } catch (error) {
        return res.send({erro: error, resultado: null});                        

       }

    }
}