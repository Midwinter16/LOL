const Hero = require("../../models/Hero");

module.exports = (app) => {
  const router = require("express").Router();

  const Category = require("../../models/Category");
  const Article = require("../../models/Article");
  const Rune = require("../../models/Rune");
  const Equip = require("../../models/Equip");
  const Match = require("../../models/Match");
  const Ad = require("../../models/Ad");

  //   下面这个方法可以直接使用mongdb来获取模型，但是会报错，先不使用
  //   const mongoose = require("mongoose");
  //   const Category = mongoose.model("Category");
  //   const Article = mongoose.model("Article");

  //   这个是使用一个偷懒的方法将数据录入的方式，这个接口一般不使用
  router.get("/news/init", async (req, res) => {
    //   准确寻找出父级分类
    const parent = await Category.findOne({
      name: "新闻分类",
    });
    // 使用where参数来限定分类中父级分类为parent内容的分类
    const cates = await Category.find()
      .where({
        parent,
      })
      .lean();
    const rowlist = [
      "开发者 《云顶之弈：双城之战》收获总结",
      "恭喜 LiLuo在云顶之弈全球总决赛中夺冠！庆典即将开启！CN TFT，BEST TFT",
      "2022年4月29日 不停机更新公告",
      "欢度假期三大活动预告",
      "4月29日周免英雄更新公告",
      "日月之蚀皮肤现已上线",
      "2022季中冠军赛售票公告",
      "MSI小组赛赛程公布：5月10日20点RNG首战IW",
      "2022LPL春季赛赛季总结短片",
      "十秒真粉丝：Bin纳尔狂怒神掌劈山倒海",
      "TOP5：Xiaohu狂轰乱炸俯冲灼敌身",
      "庆RNG 2022LPL春季总决赛夺冠，限定皮肤限时销售",
      "版本研究所12.8：乌鸦小重做，波比大增强，双金身成为历史",
      "【一看就会】国服第一冰女太原马超独家教学",
      "职业选手怎么玩：Karsa打野佛耶戈打法攻略",
      "电研所丨如何科学的吃塔皮",
      "楚钧：五天速刷韩服王者！新版无赖打法的威力！",
      "【婵儿】一炮千血，不再刮痧！新版暴击流出装推荐~",
      "【特效对比】“真假至臻”，西部魔影泰隆",
      "《简笔画联盟》你渴望什么呀？",
      "【12.9版本】EDG悠米皮肤鉴赏",
      "【12.9版本】EDG厄斐琉斯皮肤鉴赏",
      "幻灵战队全员壁纸同人创作",
      "历史被揭秘，太阳谋杀者凯尔登场——日月之蚀系列皮肤上新",
      "恭喜 LiLuo在云顶之弈全球总决赛中夺冠！庆典即将开启！CN TFT，BEST TFT",
      "【老友欢聚时刻】",
      "欢度假期三大活动预告",
      "银龙重铸，骑士凯旋！ EDG冠军手办套装预售现已开启！",
      "开发者：视觉效果更新的幕后故事",
      "《云顶之弈：双城之战》全球总决赛——入围选手、赛制说明及奖杯发布",
    ];
    const newsList = rowlist.map((ele) => {
      // slice(0)表示复制一份
      const randomCate = cates.slice(0).sort((a, b) => Math.random() - 0.5);
      return {
        categories: randomCate.slice(0, 2),
        title: ele,
      };
    });
    await Article.deleteMany({});
    await Article.insertMany(newsList);
    res.send(newsList);
  });
  //   这个是使用一个偷懒的方法将数据录入的方式，这个接口一般不使用
  router.get("/heroes/init", async (req, res) => {
    await Hero.deleteMany({});
    return;
  });

  router.get("/news/list", async (req, res) => {
    //   下面是一个多重populate的方式，使用一层一层的向下查找关联出所有的信息，如先找出新闻分类，然后将新闻分类里面的子分类children关联出来，然后再将子分类里面的新闻列表关联出来，如果没理解错，其中的parent是向上查找，path是向下查找
    // 这个方法属于关联方法，mongodb还有一种方法是聚合查询
    // const parent = await Category.findOne({
    //   name: "新闻分类",
    // })
    //   .populate({
    //     path: "children",
    //     populate: {
    //       path: "newsList",
    //     },
    //   })
    //   .lean();
    //  聚合查询，也就是使用聚合通道来多次添加 查询条件
    const parent = await Category.findOne({
      name: "新闻分类",
    });
    const cates = await Category.aggregate([
      // match表示查询的第一层
      { $match: { parent: parent._id } },
      //   关联查询，类似于关系数据库里面的JOIN，这里不是很懂
      {
        $lookup: {
          from: "articles", // 根据模型名称的小写复数更改而来
          localField: "_id",
          foreignField: "categories",
          as: "newsList",
        },
      },
      // 下面的意思是将newsList数据节选出5个长度内容出来
      {
        $addFields: {
          newsList: { $slice: ["$newsList", 5] },
        },
      },
    ]);
    cates.map((cate) => {
      cate.newsList.map((news) => {
        news.categoryName = cate.name;
        return news;
      });
      return cate;
    });
    res.send(cates);
  });

  router.get("/article/list", async (req, res) => {
    const data = await Article.find().populate("relatedHero categories");
    res.send(data);
  });

  router.get("/heroes/list", async (req, res) => {
    //  下面是聚合查询
    const parent = await Category.findOne({
      name: "英雄分类",
    });
    const cates = await Category.aggregate([
      // match表示查询的第一层
      { $match: { parent: parent._id } },
      //   关联查询，类似于关系数据库里面的JOIN，这里不是很懂
      {
        $lookup: {
          from: "heroes", // 根据模型名称的小写复数更改而来
          localField: "_id",
          foreignField: "categories",
          as: "heroList",
        },
      },
    ]);
    cates.map((cate) => {
      cate.heroList.map((news) => {
        news.categoryName = cate.name;
        return news;
      });
      return cate;
    });
    res.send(cates);
  });

  router.get("/hero/list", async (req, res) => {
    const heroes = await Hero.find().populate("relatedStrategies");
    res.send(heroes);
  });

  router.get("/heroes/allhero", async (req, res) => {
    const heroes = await Hero.find().populate("relatedStrategies").limit(6);
    res.send(heroes);
  });

  // 获取文章详情
  router.get("/article/:id", async (req, res) => {
    const data = await Article.findById(req.params.id).lean();
    data.related = await Article.find()
      .where({
        categories: {
          $in: data.categories,
        },
      })
      .limit(2);
    res.send(data);
  });

  // 获取英雄详情
  router.get("/hero/:id", async (req, res) => {
    // populate的关联关系是看这个模型的属性来写的，Hero里面的关联数据如果要将partner详细信息关联出来，就要写成partner.hero
    require("../../models/Equip");
    require("../../models/Skin");
    const data = await Hero.findById(req.params.id)
      .populate("categories partner.hero items_adv items_dis skins")
      .lean();

    res.send(data);
  });

  // 获取符文列表
  router.get("/items/runes", async (req, res) => {
    const data = await Rune.find().populate("category");
    res.send(data);
  });

  // 获取装备列表
  router.get("/items/equips", async (req, res) => {
    const data = await Equip.find().populate("level");
    res.send(data);
  });

  // 获取单个装备详情
  router.get("/items/equips/:id", async (req, res) => {
    const data = await Equip.findById(req.params.id).populate("level");
    res.send(data);
  });

  // 获取比赛列表
  router.get("/matches/list", async (req, res) => {
    const data = await Match.find().populate(
      "blue.club red.club blue.bot.hero blue.mid.hero blue.jug.hero blue.top.hero blue.sub.hero blue.bot.player blue.mid.player blue.jug.player blue.top.player blue.sub.player red.bot.hero red.mid.hero red.jug.hero red.top.hero red.sub.hero red.bot.player red.mid.player red.jug.player red.top.player red.sub.player"
    );
    res.send(data);
  });

  // 获取广告列表
  router.get("/ads/list", async (req, res) => {
    const data = await Ad.find();
    res.send(data);
  });

  app.use("/web/api", router);
};
