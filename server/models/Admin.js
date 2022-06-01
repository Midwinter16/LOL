// 建立models模型（unk）
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    // select表示无法被前端获取但是可以被前端改写，如果前端写的值为空值则视为未修改
    select: false,
    // Set表示返回给前端的值要经过一定的处理，这里使用了bcrypt来加密密码
    set(value) {
      return bcrypt.hashSync(value, 12);
    },
  },
});

module.exports = mongoose.model("Admin", schema);
