let userDB;

module.exports = (injectedUserDB) => {
  userDB = injectedUserDB;

  return {
    helloWorld,
    list,
  }
};

async function list(req, res) {
  const result = await userDB.list();

  res.status(200).json({ result });
}

function helloWorld(req, res) {
  res.send("Hello World OAuth2!");
}
