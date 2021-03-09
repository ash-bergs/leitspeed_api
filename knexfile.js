/* ---------------------------- About knexfile.js --------------------------- */
//* created using the knex library and knex CLI
// CLI: knex init
// contains 3 different configure objects on start - development, staging, production 
// These objects are keys to control the environment the server will run
// We added a testing key so that we can properly test the endpoints! 

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/users.db3",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
  testing: {
    client: 'sqlite3', 
    connection: {
      filename: "./data/test.db3",
    },
    useNullAsDefault: true, 
    migrations: {
      directory: "./data/migrations",
    }, 
    seeds: {
      directory: "./data/seeds",
    }
  },
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  // ! Fixing heroku deployment... production object.. 
  production: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/users.db3",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  }

};

//TODO heroku deployment not working... I think I need to update something here ... hmm 🤔
