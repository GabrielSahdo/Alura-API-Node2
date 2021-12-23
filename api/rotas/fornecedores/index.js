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

roteador.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const fornecedor = new Fornecedor({ ...data, id });
        await fornecedor.atualizar();
    } catch (error) {
        return res.status(400).json(error.message);
    }

    return res.status(200).end();
});

module.exports = roteador;
