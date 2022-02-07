
exports.up = function(knex) {
    return knex.schema.createTable("tasks", table => {
        table.increments("id").primary()
        table.string("task", 150).notNullable()
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("tasks")
};
