// 建立models模型（unk）
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String },
  items: [
    {
      image: { type: String },
      url: { type: String },
    },
  ],
});

module.exports = mongoose.model("Ads", schema);
