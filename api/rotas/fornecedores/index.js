const roteador = require("express").Router();
const TabelaFornecedor = require("./TabelaFornecedor");
const Fornecedor = require("./Fornecedor");

roteador.get("/", async (req, res) => {
    const resultados = await TabelaFornecedor.listar();
    res.json(resultados);
});

roteador.post("/", async (req, res) => {
    const fornecedor = new Fornecedor(req.body);

    try {
        await fornecedor.criar();
        res.status(200).json(fornecedor);
    } catch (error) {
        res.status(400).json(error);
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

module.exports = roteador;
