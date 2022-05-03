const { Pool } = require("pg");

function query(queryRaw) {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "oauth2",
    password: "ates",
    port: 5432,
  });

  return pool.query(queryRaw);
}

module.exports = {
  query,
};
