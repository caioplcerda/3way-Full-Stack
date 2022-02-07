const moduloB = require("../modulos/moduloB");

let nome = "Minha calculadora V1";

function somar(a, b) {
    return a + b;
}
function subtrair(a, b) {
    return a - b;
}
function multiplicar(a, b) {
    return a * b;
}
function dividir(a, b) {
    return a / b;
}

module.exports = {
    nome,
    somar,
    subtrair,
    multiplicar,
    dividir
}