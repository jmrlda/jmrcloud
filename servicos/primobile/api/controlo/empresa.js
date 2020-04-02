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