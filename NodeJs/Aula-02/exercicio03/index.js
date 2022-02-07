const fs = require('fs');

const caminho = __dirname + '/arquivo.json'

console.log('caminho do arquivo',caminho)

const conteudo = fs.readFileSync(caminho, 'utf-8')
console.log(conteudo)

fs.readFile(caminho,'utf-8', (err, conteudo)=> {
    const config = JSON.parse(conteudo)
    console.log(`${config.db.host}:${config.db.port}`)
})

const config = require('./arquivo.json')
console.log(config.db)