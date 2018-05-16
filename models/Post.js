var mongoose = require("mongoose");
var Schema = mongoose.Schema;

PostSchema = new Schema({
  title: String,
  body: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  city: { type: Schema.Types.ObjectId, ref: "City" },
  day_created: { type: Date, default: Date() }
});
var Post = mongoose.model("Post", PostSchema);
module.exports = Post;
