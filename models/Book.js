const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  name: { type: String, required: true },
  author: { type: String },
  genre: { type: String },
  completed: { type: String, default: "false" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("book", BookSchema);
