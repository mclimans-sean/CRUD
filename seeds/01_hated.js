const movies = require('../movies');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE hated RESTART IDENTITY CASCADE;')
    .then(function () {
      // Inserts seed entries
      return knex('hated').insert(movies);
    });
};
