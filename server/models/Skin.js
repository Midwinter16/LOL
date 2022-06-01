// 建立models模型（unk）
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String },
  owner: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
  level: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
  price: { type: Number },
  cover: { type: String },
});

module.exports = mongoose.model("Skin", schema, "skins");
