const { Pool } = require("pg");

function query(queryRaw, cbFunc) {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "oauth2",
    password: "ates",
    port: 5432,
  });

  pool.query(queryRaw, (error, results) => {
    cbFunc(setResponse(error, results));
  });
}

function setResponse(error, results) {
  return {
    error: error,
    results: results ? results : null,
  };
}

module.exports = {
  query,
};
