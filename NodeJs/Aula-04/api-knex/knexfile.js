const { db } = require("./.env")

module.exports = {

  development: {
    client: 'postgresql',
    connection: db,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },


  production: {
    client: 'postgresql',
    connection: db,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }

};
