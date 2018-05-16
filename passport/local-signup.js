const User = require("mongoose").model("User");
const PassportLocalStrategy = require("passport-local").Strategy;
const config = require("../config/index.js");
const jwt = require("jsonwebtoken");
module.exports = new PassportLocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    session: false,
    passReqToCallback: true
  },
  (req, email, password, done) => {
    const userData = {
      email: email.trim(),
      password: password.trim(),
      firstname: req.body.firstname.trim(),
      lastname: req.body.lastname.trim(),
      city: req.body.city
    };

    const newUser = new User(userData);
    newUser.save((err, user) => {
      if (err) {
        return done(err);
      }

      const payload = {
        sub: user._id
      };

      // create a token string
      const token = jwt.sign(payload, config.jwtSecret);
      const data = user;
      return done(null, token, data);
    });
  }
);
