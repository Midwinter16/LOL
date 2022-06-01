// 该中间件是提供一个转换的方法，形成一个通用的接口
module.exports = (options) => {
  return (req, res, next) => {
    // 一个库组件，可以将小写复数转成大写单数，适合将传递过来的名称转成模型名称
    const modelName = require("inflection").classify(req.params.resource);
    req.Model = require(`../models/${modelName}`);
    next();
  };
};
