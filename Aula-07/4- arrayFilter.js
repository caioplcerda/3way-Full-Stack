// filter serve para filtrar um array, gera um arrey do mesmo tamanho ou menor

const produtos = [
    {nome: "Notebook", preco: 7499, fragil: false},
    {nome: "iPed Pro", preco: 5489, fragil: true},
    {nome: "Copo de vidro", preco: 12.49, fragil: true},
    {nome: "Copo descartavel", preco: 18.99, fragil: false}
];

//filtrar os produtos com precos acima de 500R$
console.log(produtos.filter(function(p){
    return p.preco > 500 && p.fragil;
}))

const caro = produto => produto.preco > 500;
const fragil = produto => produto.fragil;

let resultado = produtos.filter(caro).filter(fragil)
console.log(resultado)