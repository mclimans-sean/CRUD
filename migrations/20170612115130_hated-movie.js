
exports.up = function(knex, Promise) {
  return knex.schema.createTable('hated', (table) => {
    table.increments();
    table.text('title').notNullable();
    table.text('imdb_url').notNullable();
    table.float('rating');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('hated');
};
