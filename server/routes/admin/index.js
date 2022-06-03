module.exports = (app) => {
  // 导入数据
  const express = require("express");
  const router = express.Router({
    mergeParams: true,
  });
  const jwt = require("jsonwebtoken");
  const AdminUser = require("../../models/Admin");
  const assert = require("http-assert");

  const Player = require("../../models/Player");
  const Club = require("../../models/Club");

  // 引入中间件

  // 该中间件是提供一个转换的方法，形成一个通用的接口
  const resourceMiddleWare = require("../../middleWare/Resource");
  // 该中间件是提供一个验证用户是否登陆
  const authMiddleWare = require("../../middleWare/Auth");

  // 方法

  // 存数据
  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body);
    // 让客户端得知创建完成了
    res.send(model);
  });

  // 更新数据
  router.put("/:id", async (req, res) => {
    // 使用put方法更新原本存在数据库的数据
    // 这里的req.params指的是传递过来的路由中的冒号后面的信息，body才是传递过来的所有数据
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  // 删除数据
  router.post("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id);
    res.send(model);
  });

  // 获取全部数据，其中populate指的是将其中的parent关联数据详细化，如果没有populate，那么parent数据只是parent的ID，如果有，那么会将parent数据根据它本身的id从数据库中获取，如下区别
  // 没有populate parent: "626bc1cf0854e84740a14c55"
  // 有populate parent：{_id: "626bc1cf0854e84740a14c55", name: "news", __v: 0}
  router.get("/", authMiddleWare(), async (req, res) => {
    const queryOptions = {};
    console.log(req.Model.modelName);
    if (req.Model.modelName === "Category") {
      queryOptions.populate = "parent";
    }
    if (req.Model.modelName === "Rune") {
      queryOptions.populate = "category";
    }
    if (req.Model.modelName === "Equip") {
      queryOptions.populate = "level";
    }
    if (req.Model.modelName === "Player") {
      queryOptions.populate = "club";
    }
    if (req.Model.modelName === "Match") {
      queryOptions.populate = "blue.club red.club";
    }

    // limit代表一次获取300个，find获取所有数据库的数据
    const items = await req.Model.find().setOptions(queryOptions).limit(300);
    res.send(items);
  });

  // 获取对应ID数据
  router.get("/:id", async (req, res) => {
    const queryOptions = {};
    require("../../models/Skin");
    if (req.Model.modelName === "Equip") {
      queryOptions.populate = "level";
    }
    if (req.Model.modelName === "Hero") {
      queryOptions.populate = "skins relatedStrategies";
    }
    if (req.Model.modelName === "Club") {
      queryOptions.populate = "teamer";
    }
    // findID就是依据数据查找
    const model = await req.Model.findById(req.params.id).setOptions(
      queryOptions
    );
    res.send(model);
  });

  // 挂载路由
  app.use(
    "/admin/api/rest/:resource",
    authMiddleWare(),
    resourceMiddleWare(),
    router
  );

  // 引用组件来允许上传文件
  const multer = require("multer");
  // file定义上传文件存储地址为uploads文件夹
  const upload = multer({ dest: __dirname + "/../../uploads" });

  // 下面的中间件upload中的file对应的是上传的文件的键名
  app.post(
    "/admin/api/upload",
    authMiddleWare(),
    upload.single("file"),
    (req, res) => {
      const file = req.file;
      req.file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send(file);
    }
  );

  app.post("/admin/api/login", async (req, res) => {
    const { username, password } = req.body;
    // 根据用户名找用户

    const user = await AdminUser.findOne({
      username,
    }).select("+password");
    // +password因为在用户模型中已经将password设定为不可取出，所以要在找数据库的时候加上select来选择
    assert(user, 422, { message: "用户不存在" });

    // 对照密码
    const isValid = require("bcryptjs").compareSync(password, user.password);
    assert(isValid, 422, { message: "密码验证错误" });
    // 返回token

    const token = jwt.sign({ id: user._id }, app.get("secret"));
    res.send(token);
  });

  // 错误处理函数，因为由assert抛出的错误是服务器内的错误，无法被前端捕获，所以需要该处理函数来抛出给前端接收
  // statusCode是指assert上面设置的422等错误类型
  app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    });
  });
};
