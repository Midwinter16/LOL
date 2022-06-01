// 建立models模型（unk）
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  start: { type: String },
  end: { type: String },
  red: {
    club: { type: mongoose.SchemaType.ObjectId, ref: "Club" },
    score: { type: Number },
    top: { type: mongoose.SchemaType.ObjectId, ref: "Hero" },
    jug: { type: mongoose.SchemaType.ObjectId, ref: "Hero" },
    mid: { type: mongoose.SchemaType.ObjectId, ref: "Hero" },
    bot: { type: mongoose.SchemaType.ObjectId, ref: "Hero" },
    sub: { type: mongoose.SchemaType.ObjectId, ref: "Hero" },
  },
  blue: {
    club: { type: mongoose.SchemaType.ObjectId, ref: "Club" },
    score: { type: Number },
    top: { type: mongoose.SchemaType.ObjectId, ref: "Hero" },
    jug: { type: mongoose.SchemaType.ObjectId, ref: "Hero" },
    mid: { type: mongoose.SchemaType.ObjectId, ref: "Hero" },
    bot: { type: mongoose.SchemaType.ObjectId, ref: "Hero" },
    sub: { type: mongoose.SchemaType.ObjectId, ref: "Hero" },
  },
});

module.exports = mongoose.model("Equip", schema, "equips");
