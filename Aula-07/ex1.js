const produtos = [
    {nome: "Notebook", preco: 7499, fragil: false},
    {nome: "iPed Pro", preco: 5489, fragil: true},
    {nome: "Copo de vidro", preco: 12.49, fragil: true},
    {nome: "Copo descartavel", preco: 18.99, fragil: false}
];

const preco = [7499, 5489, 12.49, 17.99]

//map e um for com proposito
let add = preco.map(function(elem){
    return elem + elem / 100 * 30
})

console.log(preco, add)

const paraDinheiro = e => `R$ ${parseFloat(e).toFixed(2).replace('.',',')}`

let resultado = add.map(paraDinheiro)
console.log(resultado)