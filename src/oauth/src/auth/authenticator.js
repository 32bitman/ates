let userDB;

module.exports = (injectedUserDB) => {
  userDB = injectedUserDB;

  return {
    registerUser,
    login,
  };
};

async function registerUser(req, res) {
  const isUserExists = await userDB.isValidUser(req.body.username);


  if (isUserExists) {
    return res.status(400).send({ message: 'This user already exists!' });
  }

  await userDB.register(req.body.username, req.body.password);

  res.status(200).json({ message: 'Success!!!' });
}

function login(query, res) {}
