const knex = require('./knex');

module.exports = {
  getAll() {
    return knex('hated')
  },
  getOne(id) {
    return knex('hated').where('id', id).first();
  },
  create(hated) {
    return knex('hated').insert(hated, '*');
  },
  update(id, hated) {
    return knex('hated').where('id', id).update(hated, '*');
  },
  delete(id) {
    return knex('hated').where('id', id).del();
  }
}
