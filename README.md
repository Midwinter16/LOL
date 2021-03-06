# About

一个模拟LOL手机端界面的全栈项目

# 技术栈

VUE全家桶+express+mongodb

# 项目运行

```js
项目运行之前，请确保系统已经安装以下应用
1、node 
2、mongodb (开启状态)
```

```JS
git clone git@github.com:Midwinter16/LOL.git

cd LOL

在LOL文件夹下运行，恢复数据库
mongorestore -d projectAll

分别在server，admin和web中输入命令
npm i
<server中也许要额外下载npm库包--nodemon>

最后分别在server，admin和web中输入命令
npm run serve

访问: http://localhost:8080
```

# 目标功能

## web界面

按分类展示英雄列表 -- 完成

- 英雄详情页 -- 完成
- 详情页皮肤展示 -- 完成

按分类展示新闻资讯 -- 完成

- 新闻详情页 -- 完成
- 新闻相关资讯 -- 完成

展示装备页面 -- 完成

- 搜索栏（仅支持单字搜索） -- 完成
- 点击展示装备详情 -- 完成
- 按照属性筛选 -- 未完成

展示符文页面 -- 完成

- 点击展示符文详情 -- 完成

热点资讯 -- 完成

热点英雄攻略以及对应资讯 -- 完成

攻略中心 -- 完成

赛事 -- 基本完成

首页导航栏跳转 -- 未完成

商城页面 -- 未完成

## 后台界面

用户登录 -- 完成

后台界面囊括了增删查改操作，包括查看列表，有如下类

- 装备 -- 完成
- 英雄 -- 完成
- 皮肤 -- 完成
- 符文 -- 完成
- 文章 -- 完成
- 战队 -- 完成
- 选手 -- 完成
- 比赛 -- 未完成
- 广告位 -- 完成
- 分类 -- 完成
- 管理员 -- 完成

以上类别包含了数据，图片上传等操作

## 后端

在后台界面使用了JWT来验证用户，写成中间件形式，来作为上传图片，后台管理等操作的依据

使用通用接口的方法减少避免重复书写类似的接口操作

# 部分页面展示

## Web主页面

### 英雄详情页

- 英雄皮肤展示
- 英雄技能，属性，搭档，装备推荐及英雄攻略
- 关联英雄页面跳转

![heroDetail](https://github.com/Midwinter16/LOL/blob/master/images/s-hero.gif)

### 文章详情页

- 文章标题和内容
- 关联文章跳转

![articleDetail](https://github.com/Midwinter16/LOL/blob/master/images/s-article.gif)

### 攻略页面展示

- 新闻根据阅读量排序
- 根据是否置顶的攻略排序
- 根据英雄相关攻略数量从多到少排序

![Strategy](https://github.com/Midwinter16/LOL/blob/master/images/s-strategy.gif)

### 装备页面展示

- 装备详情
- 过滤操作

![equipDetail](https://github.com/Midwinter16/LOL/blob/master/images/s-equip.gif)

### 符文页面

- 符文分类和详情

![runeDetail](https://github.com/Midwinter16/LOL/blob/master/images/s-rune.gif)

### 比赛页面展示

- 比分，队伍，队员以及比赛状态

![web-match](https://github.com/Midwinter16/LOL/blob/master/images/web-match.png)

## 后台界面展示

### 登录页面以及部分主界面展示

![back-login](https://github.com/Midwinter16/LOL/blob/master/images/back-login.png)

![back-team](https://github.com/Midwinter16/LOL/blob/master/images/back-team.png)

![back-match](https://github.com/Midwinter16/LOL/blob/master/images/back-match.png)

![back-equip](https://github.com/Midwinter16/LOL/blob/master/images/back-equip.png)

![back-article](https://github.com/Midwinter16/LOL/blob/master/images/back-article.png)

![back-article-edit](https://github.com/Midwinter16/LOL/blob/master/images/back-article-edit.png)

### 后台部分操作页面gif展示

#### 新增英雄

![newHero](https://github.com/Midwinter16/LOL/blob/master/images/s-newHero.gif)

### 比赛状态管理

![matchPage](https://github.com/Midwinter16/LOL/blob/master/images/s-matchPage.gif)

# 更新日志

## version1.2.0

更新了后台管理，新增符文分类，修改item为equip，新闻分类新增攻略，所有文章新增封面选项

更新前端主页结构为swiper

## version1.2.1

更新后台，文章添加作者和置顶属性

## version1.2.2

更新了HOME页面的swiper，添加历史记录，可以使得跳转页面之后返回时不是稳定展示news页面

```JS
const swiperMain = new Swiper(".swiper-main", {
    speed: 400,
    spaceBetween: 50,
    autoHeight: true,
    history: {
        replaceState: true,
        key: "",
    },
});
// 然后在router里面的当前页面下添加三个子路由分别为
children: [
    {
        path: "/news",
    },
    {
        path: "/strategy",
    },
    {
        path: "/match",
    },
],
```

更新后端数据，添加所有英雄的小图标，皮肤，添加皮肤模型数据库，添加皮肤相关的后台页面，皮肤关联英雄本身

更新了主页，添加攻略页面的英雄攻略，英雄详情现在添加所有皮肤展示

## version1.2.3

界面：

更新了攻略，攻略关联英雄，为英雄和攻略添加对应的数据库属性

新增攻略按照热点排序，新增攻略中心显示对应英雄标签

添加符文查看界面

代码：

所有公共组件放置在main

修改组件Card样式，现在在x轴上没有padding值

## version1.2.4

前端：

更新了装备浏览界面，装备浏览添加搜索功能，**搜索器使用了节流，只能实现单字关键词搜索**

代码：

所有组件都放在了main函数下

使用vuex来将获取到的数据分类

新知识：

```css
/* 在scss中，使用穿刺选择器会报错，如 /deep/ 或者 >>> */
/* 此时要使用 ::v-deep */
/* 例子： */
.el-input >>> .el-input__inner::placeholder {
  color: white;
}
改写为
.el-input {
  ::v-deep .el-input__inner {
    border: 0;
    background-color: gray;
    }
}
```

```JS
// vuex中使用了modules后，mapState和mapMutations使用方法为
computed: {
  ...mapState({
    normal: (state) => state.Equips.normal,
    epic: (state) => state.Equips.epic,
    legend: (state) => state.Equips.legend,
    myth: (state) => state.Equips.myth,
  }),
}
methods:{
  ...mapMutations("Equips", {
    classify: "classify",
  }),
}
```

## version1.2.5

前端：添加了赛事界面，在后台添加了战队，职业选手和比赛的增删查改

代码：使用vuex来实现战队选手属性管理，具体为根据战队筛选，根据是否首发筛选等

新知识：

```JS
// 在watch中如果要监听数组或者对象中的某一个属性或者元素，要使用deep属性
watch: {
  model:{
    deep:true,
      handler(newVal){
      console.log(newVal);
    }
  },
}
// 如果是只监听对象或者属性中的某个属性，为了减少监听开支，使用单引号的监听方法
// 要注意这种方法在VUE3中被删除，使用watch或者watchEffect来替代
watch: {
  'model.attribute':{
    deep:true,
      handler(newVal){
      console.log(newVal);
    }
  },
},
```

```JS
// git 拉取指定分支内容
git pull origin <远程分支名>:<本地分支名>
// git 推送到远程指定分支内容
git push origin <本地分支名>:<远程分支名>
// git 删除远程仓库分支
git push origin --delete remoteBranchName
```

```JS
// VUEX中，使用action请求异步操作，其中如果要在action中使用mutation，那么要使用context参数
actions: {
    async getAllPlayers(context) {
        const { data: res } = await getPlayerList();
        context.commit("initAllPlayers", res);
    },
},
// 其中传参方式参照commit中二参
```

## version1.2.6

### 后台管理

新增新建比赛页面，比较粗糙，后续考虑修改数据，未完成的部分有

- 选择战队后选手框有默认值
- 重复选择英雄冲突效果

新增现有和历时比赛页面

- **实时记录比赛时间（使用countTime组件实现）**
- 根据赛制的胜场次数可以判断出整个赛制是否完成
- 胜方显示胜利标志

### 代码

往后的数据都使用vuex管理

## version1.2.7

### web页面

比赛页面已经完成

- 呈现正在比赛，比赛中以及完成比赛三种列表
- 呈现双方队员头像

将news页面的滚动栏大图改成广告位，根据广告发布时间来展示5个最新的广告/公告

英雄详情页添加分路图标

修改了英雄攻略中按照攻略数量从多到少进行排序

**攻略中心数据转到VUEX管理**

### 后台

英雄编辑页面

- 英雄顺/逆风装备选择修改为限制6件
- 装备选择增加分类
- 搭档名称优化
- 为英雄添加分路属性

## version1.2.8

修复BUG

### web页面

英雄详情页面

- 现在点击装备会显示装备属性
- 进阶攻略页面已完成，展示和英雄相关攻略资讯
- 修复点击相关英雄时没有滑动到顶部的问题

主页面-news

- 添加所有资讯组件-新闻按照创建日期来排序
- vuex管理数据
- **新增下拉刷新**
- 监听滑动事件，得到tips的DOM的offsetTop，来判断是否到底，用来触发刷新
