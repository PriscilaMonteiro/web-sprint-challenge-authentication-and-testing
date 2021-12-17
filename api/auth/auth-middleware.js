const User = require("../users/users-model");
const { findBy } = require("../users/users-model");

function validUserBody(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(422).json({ message: "username and password required" });
  } else {
    next();
  }
}

async function checkUsernameExists(req, res, next) {
  try {
    const users = await User.findBy({ username: req.body.username });
    if (!users.length) {
      next();
    } else {
      next({ status: 422, message: "username taken" });
    }
  } catch (err) {
    next(err);
  }
}

async function validatedUser(req, res, next) {
  try {
    const { username } = req.body;
    const user = await findBy({ username: username });
    if (user.length) {
      req.user = user[0];
      next();
    } else {
      next({
        status: 401,
        message: "invalid credentials",
      });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validUserBody,
  checkUsernameExists,
  validatedUser,
};
