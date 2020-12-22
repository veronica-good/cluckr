// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'quiz_1',
      username: 'veronica',
      password: '1234'
    }
  },
  migrations: {
    tableName: 'migrations',
    directory: '/db/migrations'
  },
  seeds: {
    directory: '/db/seeds'
  }
};
