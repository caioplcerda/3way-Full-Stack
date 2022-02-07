
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('clientes').del()
    .then(function () {
      // Inserts seed entries
      return knex('clientes').insert([
        {name: 'Caio Lacerda', email: 'caioplace@gmail.com', phone: 998405488, address: 'alameda da sibipirunas'},
        {name: 'Lis Lacerda', email: 'Lisplace@gmail.com', phone: 972396572, address: 'alameda da sibipirunas'},
      ]);
    });
};
