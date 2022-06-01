// 该中间件是提供一个验证用户是否登陆
module.exports = (options) => {
  const jwt = require("jsonwebtoken");
  const AdminUser = require("../models/Admin");
  const assert = require("http-assert");
  // 下面的assert就是表示验证token是否存在是否合法是否可以解码
  return async (req, res, next) => {
    console.log(req.headers.authorization);
    const token = String(req.headers.authorization).split(" ").pop();
    assert(token, 401, "请先登录");
    console.log(token);
    const { id } = jwt.verify(token, req.app.get("secret"));
    assert(id, 401, "请先登录");
    req.user = await AdminUser.findById(id);
    assert(req.user, 401, "请先登录");
    await next();
  };
};
