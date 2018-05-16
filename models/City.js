var mongoose = require("mongoose");
var Schema = mongoose.Schema;

CitySchema = new Schema({
  name: String,
  img: String,
  lat: Number,
  lng: Number
});
var City = mongoose.model("City", CitySchema);
module.exports = City;
