const express = require("express");

const porta = 3003;
const app = express();
const bancoDeDados = require("./bancoDeDados");

app.use(express.json());
app.use(
  express.urlencoded({
    exteded: true,
  })
);

app.get("/produtos", (req, res) => {
  res.send(bancoDeDados.getProdutos());
});

app.get("/produtos/:id", (req, res) => {
  res.send(bancoDeDados.getProduto(req.params.id));
});

app.post("/produtos", (req, res) => {
  const produto = bancoDeDados.salvarProduto({
    nome: req.body.nome,
    preco: req.body.preco,
  });
  res.send(produto);
});

app.put("/produtos", (req, res) => {
  const produto = bancoDeDados.salvarProduto({
    id: req.body.id,
    nome: req.body.nome,
    preco: req.body.preco,
  });
  res.send(produto);
});

app.delete("/produtos/:id", (req, res) => {
  const produto = bancoDeDados.excluirProdutos(req.params.id);
  res.send(bancoDeDados.getProduto(req.parems.id));
});

app.listen(porta, () => {
    console.log(`Servidor funcionando na porta ${porta}`)
});
