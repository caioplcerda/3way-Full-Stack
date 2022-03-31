import { createConnection } from "typeorm";

createConnection().then((connection) => {
  try{
    console.log('Banco de dados conectado com sucesso')
    connection.synchronize
  } catch (error) {
    console.log('Erro ao conectar ao Banco de dados', error)
  }
})