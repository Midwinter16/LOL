module.exports = {
  // publicPath表示的是生成的静态文件路径，如下，表示的是生产环境下将生成的文件放在admin文件夹中
  publicPath: process.env.NODE_ENV === "production" ? "/admin/" : "/",
  //   outputDir表示要输出到那个文件夹，下面表示直接输出到server文件夹下的admin中
  outputDir: __dirname + "/../server/admin",
};
