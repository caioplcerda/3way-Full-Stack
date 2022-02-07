import { createConnection } from "typeorm";

createConnection().then((connection) => {
    try{
        console.log('Banco de dados conectado com sucesso')
        connection.synchronize();
    }catch (error) {
        console.log('erro ao conectar ao banco de dados', error)
    }
})