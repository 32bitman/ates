let pgPool;

module.exports = (injectedPgPool) => {
  pgPool = injectedPgPool;

  return {
    saveAccessToken,
    getUserIdFromBearerToken,
  };
};

function saveAccessToken(accessToken, userID) {
  const getUserQuery = `INSERT INTO access_tokens (access_token, user_id) VALUES ('${accessToken}', ${userID});`;

  return pgPool.query(getUserQuery);
}

async function getUserIdFromBearerToken(bearerToken) {
  const getUserIDQuery = `SELECT * FROM access_tokens WHERE access_token = '${bearerToken}';`;

  const response = await pgPool.query(getUserIDQuery);
  const userId = response.results?.rowCount == 1
      ? response.results.rows[0].user_id
      : null;

  return userId;
}
