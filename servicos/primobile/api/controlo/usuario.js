const Usuario = require('../modelo/usuario');
const Filial = require('../modelo/empresa_filial');


module.exports = {
        create: async ( req, res ) => {
        const { nome, senha, perfil, documento, usuario } = req.body;
        var id;
        var empresa_filial = id = req.params.id;

        try {
            const _usuario = new Usuario();
            _usuario.usuario = usuario
            _usuario.nome = nome;

            _usuario.perfil = perfil;
            _usuario.documento = documento;
            _usuario.empresa_filial = empresa_filial;

   
            _usuario.setSenha(senha);
            _usuario.save();
            const filialById = await (await Filial.findById(id)).populate('empresa');      

            filialById.usuarios.push(_usuario);
            await filialById.save();
    
            return res.status(201).send({erro: null, resultado: filialById});

                
        } catch (error) {
            console.error("[create] Erro: ");
            console.error(error);
            return res.status(400).send({erro: error, resultado: null});
        }
        //  await    usuario.save();

    },

    find: async ( req, res ) => {
        try {
            const usuario = await Usuario.find();
            return res.send({erro: null, resultado: usuario});            
        } catch (error) {
            return res.send({erro: error, resultado: null});            
        }
    },

    findById: async ( req, res ) => {
        try {
            const { id } = req.params;        
            const usuario = await Usuario.findById(id).populate('empresa_filial');
            return res.send({erro: null, resultado: usuario});            
                
        } catch (error) {
            return res.send({erro: error, resultado: null});                        
        }

    },

    findByUsuario: async ( req, res ) => {
        try {
            const { id } = req.params;        
            const _usuario = await Usuario.find({usuario: id}).populate('empresa_filial');
            return res.send({erro: null, resultado: _usuario});            
                
        } catch (error) {
            return res.send({erro: error, resultado: null});                        
        }

    },
    

    filialByUsuario: async ( req, res ) => {

        try {
            const { id } = req.params;
            const usuario = await Usuario.findById(id).populate('empresa_filial');
            return res.send({erro: null, resultado: usuario.filial});                        

        } catch (error) {
            return res.send({erro: error, resultado: null});                        

        }
    },



    login: async ( req, res ) => {

        try {
           var  {nome, senha} = req.body;
            Usuario.findOne({nome: nome}, async function( err, user ) {
                if (user === null) {
                    return res.status(400).send({
                        erro: {mensagem: "usuario nao encontrado"},
                        resultado: null
                    });
                } else {
                    if ( user.validarSenha(senha)) {
                       user = await user.populate('empresa_filial').execPopulate()
                        return res.status(201).send({
                            erro: null,
                            resultado: user
                        });
                    } else {
                        return res.status(400).send({
                            erro: {mensagem: "senha invalida"},
                             resultado: null
                        });
                    }
                }
            });
                
        } catch (error) {
            return res.send({erro: error, resultado: null});                        
        }
    },

    updateSenha: async (req, res) => {
        
        try {
            var  {nome, senha_actual, senha_nova, senha_confirmar} = req.body;


            if (nome == null || senha_actual == null  || senha_confirmar == null || senha_nova == null) {
                return res.send({erro: {mensagem: "Campo nome, senha_actual, senha_nova, senha_confirmar não deve estar vazia!"}, resultado: null});                        

            }
             Usuario.findOne({nome: nome}, async function( err, user ) {
                 if (user === null) {
                     return res.status(400).send({
                         erro: {mensagem: "usuario nao encontrado"},
                         resultado: null
                     });
                 } else {
                     if ( user.validarSenha(senha_actual)) {

                        user.setSenha(senha_confirmar);
                        user.save();
                        return res.status(200).send({
                            erro: null,
                             resultado: "sucesso"
                        });
                     } else {
                         return res.status(400).send({
                             erro: {mensagem: "senha invalida"},
                              resultado: null
                         });
                     }
                 }
             });
                 
         } catch (error) {
             return res.status(400).send({erro: error, resultado: null});                        
         }
    }

    // registrarCliente: () => {

    //     var _user = 
    // }


}