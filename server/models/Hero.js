// 建立models模型（unk）
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String }, //名字
  icon: { type: String }, //小图标
  skins: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Skin" }], //皮肤
  title: { type: String }, //称号
  // 这里是英雄的分类，要和之前创建的分类的数据库做关联
  // 而且英雄会有出现多分类的选项，所以要将这个对象包裹一层数据，达到多分类的效果
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
  positions: [{ type: String }],
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number },
  },
  skills: [
    {
      name: { type: String },
      icon: { type: String },
      description: { type: String },
      tips: { type: String },
      cost: { type: String },
      cooldown: { type: String },
    },
  ],
  items_adv: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Equip" }],
  items_dis: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Equip" }],
  usageTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String },
  partner: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
      description: { type: String },
    },
  ],
  relatedStrategies: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Article" }],
});

module.exports = mongoose.model("Hero", schema, "heroes");
