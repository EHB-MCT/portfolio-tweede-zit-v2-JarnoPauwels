require("dotenv").config({ path: "../../.env" });

module.exports = {
  client: "pg",
  connection: "postgres://postgres:bel6Chika@localhost:5432/dev5",
  // connection: {
  //   host: process.env.DB_HOST,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_DATABASE,
  // },
  migrations: {
    tableName: "knex_migrations",
    directory: "./migrations",
  },
};
