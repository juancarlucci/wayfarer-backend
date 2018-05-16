const express = require("express");
const User = require("mongoose").model("User");
const router = new express.Router();

router.get("/okay", (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message.",
    user: req.user
  });
});

router.get("/felix", (req, res) => {
  res.status(200).json({
    message:
      "this is felix you are here because your token is valid means you are signed in",
    user: req.user
  });
});

router.put("/profile", (req, res) => {
  let user = req.user;
  // update the users's profile
  user.firstname = req.body.firstname || user.firstname;
  user.lastname = req.body.lastname || user.lastname;
  user.email = req.body.email || user.email;
  user.city = req.body.city || user.city;

  // save updated user in db
  user.save(function(err, savedUser) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: "user updated", user: savedUser });
    }
  });
});

module.exports = router;
