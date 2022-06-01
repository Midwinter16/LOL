// 建立models模型（unk）
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String },
  level: { type: String },
  row: { type: Number },
  col: { type: Number },
  icon: { type: String },
  description: { type: String },
  category: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
});

module.exports = mongoose.model("Rune", schema, "runes");
