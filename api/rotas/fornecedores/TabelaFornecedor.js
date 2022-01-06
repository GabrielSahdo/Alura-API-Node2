const Modelo = require("./ModeloTabelaFornecedor");

module.exports = {
    listar() {
        return Modelo.findAll();
    },

    inserir(fornecedor) {
        return Modelo.create(fornecedor);
    },

    async pegarPorId(id) {
        const encontrado = await Modelo.findOne({
            where: { id: id },
        });

        if (!encontrado) {
            throw new Error("fornecedor nao encontrado");
        }

        return encontrado;
    },

    atualizar(id, dados) {
        return Modelo.update(dados, {
            where: { id: id },
        });
    },

    async remover(id) {
        return Modelo.destroy({ where: {id: id} });
    },
};
