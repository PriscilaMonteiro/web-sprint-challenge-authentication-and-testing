const router = require("express").Router();
const bcrypt = require("bcryptjs");
const tokenBuilder = require("./token-builder");
const User = require("../users/users-model");

const {
  validUserBody,
  checkUsernameExists,
  validatedUser,
} = require("./auth-middleware");

router.post(
  "/register",
  validUserBody,
  checkUsernameExists,
  (req, res, next) => {
    const { username, password } = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(password, rounds);
    const newUser = {
      username: username,
      password: hash,
    };

    User.add(newUser)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch(next);
  }
);

router.post("/login", validUserBody, validatedUser, (req, res, next) => {
  let { password } = req.body;
  if (bcrypt.compareSync(password, req.user.password)) {
    const token = tokenBuilder(req.user);
    res.status(200).json({
      message: `welcome, ${req.user.username}`,
      token,
    });
  } else {
    next({ status: 401, message: "Invalid credentials" });
  }
});

module.exports = router;
