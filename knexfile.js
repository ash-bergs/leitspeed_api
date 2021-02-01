/* ---------------------------- About knexfile.js --------------------------- */
//* created using the knex library and knex CLI
// CLI: knex init
// contains 3 different configure objects 
// for 3 different environments - development, staging and production 

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

  production: {
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
  }

};


//? DB in github because I failed to add to the gitignore 
// git rm -r --cached 