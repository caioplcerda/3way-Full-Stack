// map serve para mapear um array, modificar e retornar um array do mesmo tamanho
// o map nao causa modificacao no array origiral

const nums = [1, 2, 3, 4, 5]

//map e um for com proposito
let duplo = nums.map(function(elem){
    return elem * 2
})

console.log(nums, duplo)

const soma10 = e => e + 10
const triplo = e => e * 3
const paraDinheiro = e => `R$ ${parseFloat(e).toFixed(2).replace('.',',')}`

let resultado = nums.map(soma10).map(triplo).map(paraDinheiro)
console.log(resultado)