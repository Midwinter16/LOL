// 建立models模型（unk）
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  number: { type: String },
  name: { type: String },
  icon: { type: String },
  description: { type: String },
  club: { type: mongoose.SchemaTypes.ObjectId, ref: "Club" },
  position: { type: String },
  adept: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Hero" }],
  status: { type: String },
  special: { type: String },
});

module.exports = mongoose.model("Player", schema, "players");
