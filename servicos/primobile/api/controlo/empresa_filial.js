const Filial = require('../modelo/empresa_filial');
const Empresa = require('../modelo/empresa');

module.exports = {
  create: async (req, res) => {
    try {

      var empresa = req.params;
      var id = empresa.id;
      const {
        nome,
        ip
      } = req.body;

      const filial = await Filial.create({
        nome,
        ip,
        empresa: id
      });

      await filial.save();

      // return res.send(empresa);

      const empresaById = await Empresa.findById(id);
      empresaById.filial.push(filial);
      await empresaById.save();
      return res.send({
        erro: null,
        resultado: empresaById
      });

    } catch (error) {
      return res.send({
        erro: error,
        resultado: null
      });

    }

  },
  find: async (req, res) => {
    try {
      const filial = await Filial.find().populate('usuarios');
      return res.send({
        erro: null,
        resultado: filial
      });
    } catch (error) {
      return res.send({
        erro: error,
        resultado: null
      });
    }
  },

  empresaByFilial: async (req, res) => {

    try {
      const {
        id
      } = req.params;
      const empresaByFilial = await (await Filial.findById(id)).populate('empresa');      
      return res.send({
        erro: null,
        resultado: empresaByFilial
      });
    } catch (error) {
      return res.send({
        erro: error,
        resultado: null
      });
    }

  },
}