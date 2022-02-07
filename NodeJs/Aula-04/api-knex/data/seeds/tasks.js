
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        { task: 'Criar banco de dados'},
        { task: 'atualizar banco de dados'},
        { task: 'deletar banco de dados'}
      ]);
    });
};
