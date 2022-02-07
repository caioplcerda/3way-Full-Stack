const axios = require('axios')
const url = 'http://127.0.0.1:5500/funcionarios/funcionarios.json'

const chineses = f => f.pais == 'China';
const mulheres = f => f.genero == 'F'
const maiorSalario = (func, funcAtual) =>{
    return func.salario > funcAtual.salario ? func : funcAtual
}

axios.get(url).then(response =>{
    const funcionarios = response.data;
    const funcionario = funcionarios.filter(mulheres).filter(chineses).reduce(maiorSalario);
    console.log(funcionario)
    console.log('Quantidade de funcionarios', funcionario.length)
})