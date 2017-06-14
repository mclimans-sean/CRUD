// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/movies-my-gf-hates'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/test-movies-my-gf-hates'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
