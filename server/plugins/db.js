module.exports = (app) => {
  const mongoose = require("mongoose");
  // unk
  mongoose.connect("mongodb://127.0.0.1:27017/projectAll", {
    useNewUrlParser: true,
  });

  // 当使用模型之间有关联时，例如A引用B，如果此时B没有被使用过可能会报错，所以要在db中先将所有的模型都引用一遍，使用到的包是require-all
  require("require-all")(__dirname, "./../models");
};
