let pgPool;

module.exports = (injectedPgPool) => {
  pgPool = injectedPgPool;

  return {
    register,
    getUser,
    isValidUser,
    list,
  };
};

console.log(pgPool);

var crypto = require("crypto");

function register(username, password) {
  var shaPass = crypto.createHash("sha256").update(password).digest("hex");

  const query = `INSERT INTO users (username, user_password) VALUES ('${username}', '${shaPass}')`;

  return pgPool.query(query);
}

async function list() {
  const listQuery = 'SELECT id, username FROM users';

  const result = await pgPool.query(listQuery);
  console.log(result);

  return result.rows;
}

function getUser(username, password) {
  var shaPass = crypto.createHash("sha256").update(password).digest("hex");

  const getUserQuery = `SELECT * FROM users WHERE username = '${username}' AND user_password = '${shaPass}'`;

  return pgPool.query(getUserQuery);
}

async function isValidUser(username) {
  const query = `SELECT * FROM users WHERE username = '${username}'`;

  const response = await pgPool.query(query);

  const isValidUser = response.results
    ? !(response.results.rowCount > 0)
    : null;

  return isValidUser;
}
