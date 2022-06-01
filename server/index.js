const express = require("express");

const app = express();

// 设置秘钥
app.set("secret", "jiayou");

// 跨域
app.use(require("cors")());
// express.json()函数是Express中的内置中间件函数。它使用body-parser解析带有JSON有效负载的传入请求。
app.use(express.json());
// 将静态文件暴露使其可以访问
app.use("/uploads", express.static(__dirname + "/uploads"));
// 这个就是将admin内的html文件通过static的方式暴露出去
app.use("/admin", express.static(__dirname + "/admin"));
// 这个就是将web内的html文件通过static的方式暴露出去
app.use("/", express.static(__dirname + "/web"));

// 引入数据库
require("./plugins/db.js")(app);
// 引入admin下面的路由存放数据，对接后台
require("./routes/admin/index")(app);
// 引入admin下面的路由存放数据，对接前端
require("./routes/web/index")(app);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
