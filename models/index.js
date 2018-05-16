var mongoose = require("mongoose");
/*add you connection somewhere here*/
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/way_farer_backend",
  { promiseLibrary: global.Promise }
);

module.exports.User = require("./User");
module.exports.City = require("./City");
module.exports.Post = require("./Post");
