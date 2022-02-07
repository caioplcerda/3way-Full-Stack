const sequence = {
  _id: 1,
  get id() {
    return this._id++;
  }
}

const produtos = {};

//Incluir um novo produto no array produto
function salvarProduto(produto) {
    if(!produto.id) produto.id = sequence.id
    produtos[produto.id] = produto
    return produto
}

//obter todos produto pelo id ou vazio
function getProdutos(id) {
    return Object.values(produtos);
}

//obter um produto pelo id ou vazio
function getProduto(id) {
    return produtos[id] || {}
}

// excluir um produto pelo id
function excluirProdutos(id){
    const produto = produtos[id]
    delete produtos[id]
    return produto
}

module.exports = {
    salvarProduto,
    getProduto,
    getProdutos,
    excluirProdutos
}