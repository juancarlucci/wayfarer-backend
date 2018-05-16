var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

UserSchema = new Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  firstname: String,
  lastname: String,
  img: String,
  city: { type: Schema.Types.ObjectId, ref: "City" },
  dateJoined: { type: Date, default: Date() }
});

UserSchema.methods.comparePassword = function comparePassword(
  password,
  callback
) {
  bcrypt.compare(password, this.password, callback);
};
UserSchema.pre("save", function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified("password")) return next();

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) {
      return next(saltError);
    }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});
var User = mongoose.model("User", UserSchema);
module.exports = User;
