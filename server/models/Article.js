// 建立models模型（unk）
const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    title: { type: String },
    // 这里是英雄的分类，要和之前创建的分类的数据库做关联
    // 而且英雄会有出现多分类的选项，所以要将这个对象包裹一层数据，达到多分类的效果
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }], //文章类别
    body: { type: String }, //文章主题
    cover: { type: String }, //封面
    author: { type: String }, //作者
    topStatus: { type: Boolean }, //是否置顶
    clicks: { type: Number },
    relatedHero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
  },
  // 设置时间戳为true，表示每次录入和更新都会将该属性写进对应的数据内
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Article", schema);
