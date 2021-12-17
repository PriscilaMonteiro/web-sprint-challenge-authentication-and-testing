const jwt = require("jsonwebtoken");
const { SECRET } = require("../secrets/index");

module.exports = function tokenBuilder(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };
  const token = jwt.sign(payload, SECRET, options);
  return token;
};
