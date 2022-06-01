// 建立models模型（unk）
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String },
  abbr: { type: String },
  icon: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("Club", schema, "clubs");
