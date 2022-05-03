let userDB;
let tokenDB;

module.exports = (injectedUserDB, injectedTokenDB) => {
  userDB = injectedUserDB;
  tokenDB = injectedTokenDB;

  return {
    getClient,
    saveAccessToken,
    getUser,
    grantTypeAllowed,
    getAccessToken,
  };
};

function getClient(clientID, clientSecret) {
  const client = {
    clientID,
    clientSecret,
    grants: null,
    redirectUris: null,
  };

  return client;
}

function grantTypeAllowed(clientID, grantType) {
  return true;
}

function getUser(username, password) {
  return userDB.getUser(username, password);
}

function saveAccessToken(accessToken, clientID, expires, user) {
  return tokenDB.saveAccessToken(accessToken, user.id);
}

async function getAccessToken(bearerToken) {
  const userId = await tokenDB.getUserIDFromBearerToken(bearerToken);
  const accessToken = {
    user: {
      id: userID,
    },
    expires: null,
  };

  if (!userId) {
    throw new Error('No user found');
  }

  return accessToken;
}
