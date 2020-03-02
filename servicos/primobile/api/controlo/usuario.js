const Usuario = require('../modelo/usuario');
const Filial = require('../modelo/empresa_filial');


module.exports = {
    create: async ( req, res ) => {
        const { nome, email, senha, perfil, documento } = req.body;
        var id;
        var empresa_filial = id = req.params.id;

        try {
            const usuario = new Usuario();
            usuario.nome = nome;
            usuario.email = email;
            usuario.perfil = perfil;
            usuario.documento = documento;
            usuario.empresa_filial = empresa_filial;

   
            usuario.setSenha(senha);
            usuario.save();
            const filialById = await Filial.findById(id);
            filialById.usuarios.push(usuario);
            await filialById.save();
    
            return res.status(201).send({erro: null, resultado: filialById});

                
        } catch (error) {
            console.log(error);
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
    }


}