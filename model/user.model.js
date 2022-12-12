const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: String,
  password: String,
});

const UserMOdel = mongoose.model("users", userSchema);

module.exports = UserMOdel;
