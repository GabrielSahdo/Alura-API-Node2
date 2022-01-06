const roteador = require("express").Router();
const TabelaFornecedor = require("./TabelaFornecedor");
const Fornecedor = require("./Fornecedor");

roteador.get("/", async (req, res) => {
    const resultados = await TabelaFornecedor.listar();
    res.status(200).json(resultados);
});

roteador.post("/", async (req, res) => {
    const fornecedor = new Fornecedor(req.body);

    try {
        await fornecedor.criar();
        res.status(201).json(fornecedor);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

roteador.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const fornecedor = new Fornecedor({ id: id });
        await fornecedor.carregar();
        res.status(200).json(fornecedor);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

roteador.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const fornecedor = new Fornecedor({ ...data, id });
        await fornecedor.atualizar();
    } catch (error) {
        return res.status(400).json(error.message);
    }

    return res.status(204).end();
});

roteador.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const fornecedor = new Fornecedor({id});
        await fornecedor.carregar();
        await fornecedor.remover();

        res.status(204).end();
    } catch (err) {
        return res.status(404).json({message: err.message});
    }
})

module.exports = roteador;
