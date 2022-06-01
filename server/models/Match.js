// 建立models模型（unk）
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  start: { type: String },
  end: { type: String },
  red: {
    club: { type: mongoose.SchemaType.ObjectId, ref: "Club" },
    score: { type: Number },
    top: {
      player: { type: mongoose.SchemaType.ObjectId, ref: "Player" },
      hero: { type: mongoose.SchemaType.ObjectId, ref: "Hero" },
    },
    jug: {
      player: { type: mongoose.SchemaType.ObjectId, ref: "Player" },
      hero: { type: mongoose.SchemaType.ObjectId, ref: "Hero" },
    },
    mid: {
      player: { type: mongoose.SchemaType.ObjectId, ref: "Player" },
      hero: { type: mongoose.SchemaType.ObjectId, ref: "Hero" },
    },
    bot: {
      player: { type: mongoose.SchemaType.ObjectId, ref: "Player" },
      hero: { type: mongoose.SchemaType.ObjectId, ref: "Hero" },
    },
    sub: {
      player: { type: mongoose.SchemaType.ObjectId, ref: "Player" },
      hero: { type: mongoose.SchemaType.ObjectId, ref: "Hero" },
    },
  },
  blue: {
    club: { type: mongoose.SchemaType.ObjectId, ref: "Club" },
    score: { type: Number },
    top: {
      player: { type: mongoose.SchemaType.ObjectId, ref: "Player" },
      hero: { type: mongoose.SchemaType.ObjectId, ref: "Hero" },
    },
    jug: {
      player: { type: mongoose.SchemaType.ObjectId, ref: "Player" },
      hero: { type: mongoose.SchemaType.ObjectId, ref: "Hero" },
    },
    mid: {
      player: { type: mongoose.SchemaType.ObjectId, ref: "Player" },
      hero: { type: mongoose.SchemaType.ObjectId, ref: "Hero" },
    },
    bot: {
      player: { type: mongoose.SchemaType.ObjectId, ref: "Player" },
      hero: { type: mongoose.SchemaType.ObjectId, ref: "Hero" },
    },
    sub: {
      player: { type: mongoose.SchemaType.ObjectId, ref: "Player" },
      hero: { type: mongoose.SchemaType.ObjectId, ref: "Hero" },
    },
  },
});

module.exports = mongoose.model("Equip", schema, "equips");
