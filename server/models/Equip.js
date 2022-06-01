// 建立models模型（unk）
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String },
  icon: { type: String },
  level: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
  description: { type: String },
});

module.exports = mongoose.model("Equip", schema, "equips");
