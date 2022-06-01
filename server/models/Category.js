// 建立models模型（unk）
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String },
  // 这里存分类父类的ID值，ref表示的是关联哪一个模型，要实现将分类的上级分类调用出来的时候，要知道去哪个模型找
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
});

// 下面是关联的方法，其中localField是本地键的意思，foreignField是外地键的意思，应该意思是说外地键是指关联的上级目录，ref是关联的子目录？

schema.virtual("children", {
  localField: "_id",
  foreignField: "parent",
  justOne: false,
  ref: "Category",
});

schema.virtual("newsList", {
  localField: "_id",
  foreignField: "categories",
  justOne: false,
  ref: "Article",
});

module.exports = mongoose.model("Category", schema);
