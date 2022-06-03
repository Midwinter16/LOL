// 建立models模型（unk）
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  BOnum: { type: Number },
  WINnum: { type: Number },
  start: { type: String },
  end: { type: String },
  over: { type: Boolean }, // 代表整个赛制已经完成
  winer: { type: String },
  red: {
    club: { type: mongoose.SchemaTypes.ObjectId, ref: "Club" },
    score: { type: Number },
    top: {
      player: { type: mongoose.SchemaTypes.ObjectId, ref: "Player" },
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
    },
    jug: {
      player: { type: mongoose.SchemaTypes.ObjectId, ref: "Player" },
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
    },
    mid: {
      player: { type: mongoose.SchemaTypes.ObjectId, ref: "Player" },
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
    },
    bot: {
      player: { type: mongoose.SchemaTypes.ObjectId, ref: "Player" },
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
    },
    sub: {
      player: { type: mongoose.SchemaTypes.ObjectId, ref: "Player" },
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
    },
  },
  blue: {
    club: { type: mongoose.SchemaTypes.ObjectId, ref: "Club" },
    score: { type: Number },
    top: {
      player: { type: mongoose.SchemaTypes.ObjectId, ref: "Player" },
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
    },
    jug: {
      player: { type: mongoose.SchemaTypes.ObjectId, ref: "Player" },
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
    },
    mid: {
      player: { type: mongoose.SchemaTypes.ObjectId, ref: "Player" },
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
    },
    bot: {
      player: { type: mongoose.SchemaTypes.ObjectId, ref: "Player" },
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
    },
    sub: {
      player: { type: mongoose.SchemaTypes.ObjectId, ref: "Player" },
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
    },
  },
});

module.exports = mongoose.model("Match", schema, "matches");
