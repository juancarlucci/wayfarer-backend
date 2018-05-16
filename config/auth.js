const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('./index.js');


/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.token) {

    return res.status(401).json({message:'no token sent'});
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.token;

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).json({message:'token is not valid'}); }

    const userId = decoded.sub;

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).json({message:"token doesn't belong to any user"});
      }

      req.user=user;

      next();
    });
  });
};
