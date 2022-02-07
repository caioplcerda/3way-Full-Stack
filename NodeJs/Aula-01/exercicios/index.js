const calculadora = require('./calculadora')

calculadora.nome = 'Calculadora do Caio'
console.log(calculadora.nome)

console.log('a soma de 20 e 50 e: ', calculadora.somar(20, 50))
console.log('a multiplicacao de 20 e 10 e: ', calculadora.multiplicar(20, 10))
console.log('a subtracao de 25 e 13 e: ', calculadora.subtrair(25, 13))
console.log('a divisao de 20 e 5 e: ', calculadora.dividir(20, 5))