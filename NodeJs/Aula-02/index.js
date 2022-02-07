const http = require('http')

http.createServer((req, res) => {
    res.write('Bom dia a todos os alunos que vieram na aula hoje')
    res.end()
}).listen(8080)

