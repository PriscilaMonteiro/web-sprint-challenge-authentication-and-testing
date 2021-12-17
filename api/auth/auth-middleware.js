const { JWT_SECRET } = require('../secrets/index');
const User = require('../users/users-model');
const { findBy } = require('../users/users-model');
const jwt = require('jsonwebtoken');

const restricted = (req, res, next) => {
  const token = req.headers.authorization
  console.log(req.headers)

  if (!token) {
    return next({ status: 401, message: 'Token required'})
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return next({
        status: 401,
        message: "Token invalid"
      })
    }
    req.decodedJwt = decoded
    console.log(decoded)
    next()
  })
  /*
    If the user does not provide a token in the Authorization header:
    status 401
    {
      "message": "Token required"
    }

    If the provided token does not verify:
    status 401
    {
      "message": "Token invalid"
    }

    Put the decoded token in the req object, to make life easier for middlewares downstream!
  */
}


function validUserBody(req, res, next) {
  const { username, password } = req.body
  if (!username || !password) {
   res.status(422).json({ message: 'username and password required' })
    } else {
        next()
    }
}


async function checkUsernameExists (req, res, next) {
  
  try {
    const users = await User.findBy({ username: req.body.username });
    if (!users.length) { 
      next();
    }
    else {
      next({ status: 422, message: "username taken" });
    }
  } catch (err) {
    next(err)
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
                message: "invalid credentials"
            });
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
  restricted,
  validUserBody,
  checkUsernameExists,
  validatedUser,
}