// declaracao de variaveis
var nome;
let endereco;
const indice;

// Array - Vetor - Colecao - Lista

const fabricantes = ["Mercedes", "Audi", "BMW"];

function soma(a, b){
    return a + b;
}

// Arrow function

const soma = (a, b) => a + b;

// Objeto

const obj = {
    a : 1,
    b : 2,
    c : 3,
    soma(){
        return a + b + c;
    }
};

// Objeto pessoa

const pessoa = {
    nome : "Julia",
    email : "Julia@gmail.com",
    idade : 22,
    endereco : "Rua da Julia"
};

// Array de objetos

const produtos = [
    {nome: "Notebook", preco: 7499, frgil: true},
    {nome: "iPed Pro", preco: 5489, frgil: true},
    {nome: "Copo de vidro", preco: 12.49, frgil: true},
    {nome: "Copo descartavel", preco: 18.99, frgil: false}
];

// JSON -JavaScript Object Notation

const carrinho = [
    '{"nome: "Borracha", "preco": 3.45}',
    '{"nome: "caderno", "preco": 13.45}',
    '{"nome: "Kit de lapis", "preco": 22.75}',
    '{"nome: "Caneta", "preco": 7.5}'
]

const objJson = '{"nome": "Julia", "email": "julia@gmail.com", "idade": 22}'


