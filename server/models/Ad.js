// 建立models模型（unk）
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String },
  cover: { type: String },
  date: { type: String },
});

module.exports = mongoose.model("Ad", schema);
