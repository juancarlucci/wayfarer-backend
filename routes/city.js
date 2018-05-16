const express = require("express");
const router = new express.Router();
const City = require("mongoose").model("City");
router.get("/", (req, res) => {
  City.find({}, (err, all) => {
    if (err) {
      res.status(400).json({ message: "problem problem" });
    }
    res.status(200).json({ cities: all });
  });
});
router.post("/", (req, res) => {
  City.create(
    {
      name: req.body.name,
      lat: req.body.lat,
      lng: req.body.lng
    },
    (err, created) => {
      if (err) {
        res.status(500).json({ message: "city not created check your form" });
      } else {
        res.status(200).json({ city: created });
      }
    }
  );
});
router.get("/:name", (req, res) => {
  let namegot = req.params.name.trim();
  let name = namegot.split("-").join(" ");
  City.find({ name: name }, (err, found) => {
    if (err) {
      res.status(400).json({ message });
    } else {
      res.status(200).json({ city: found });
    }
  });
});
router.get("/:id/info", (req, res) => {
  let id = req.params.id;
  City.findOne({ _id: id }, (err, found) => {
    if (err) {
      res.status(400).json({ err: err.message });
    } else {
      res.status(200).json({ city: found });
    }
  });
});
router.put("/:id", (req, res) => {
  const cityId = req.params.id;
  City.findOne({ _id: cityId }, function(err, foundCity) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      // update the city's profile
      foundCity.name = req.body.name || foundCity.name;
      foundCity.lat = req.body.lat || foundCity.lat;
      foundCity.lng = req.body.lng || foundCity.lng;

      // save updated city in db
      foundCity.save(function(err, savedCity) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(200).json({ message: "city updated", city: savedCity });
        }
      });
    }
  });
});
router.delete("/:id", (req, res) => {
  let id = req.params.id;
  City.findOneAndRemove({ _id: id }, (err, found) => {
    if (err) {
      res.status(400).json({ message });
    } else {
      res.status(200).json({ city: found });
    }
  });
});

module.exports = router;
