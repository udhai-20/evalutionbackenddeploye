const mongoose = require("mongoose");
const todosSchema = mongoose.Schema({
  title: String,
  status: Boolean,
  tag: String,
  userId: String,
});
const TodosMOdel = mongoose.model("todos", todosSchema);

module.exports = TodosMOdel;
