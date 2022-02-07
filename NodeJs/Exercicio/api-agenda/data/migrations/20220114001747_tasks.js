
exports.up = function (knex) {
    return knex.schema.createTable("clientes", table => {
        table.increments("id").primary();
        table.string("name", 150).notNullable();
        table.string("email", 180).notNullable();
        table.string("phone", 20).notNullable();
        table.string("address", 250).notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("clientes");
};