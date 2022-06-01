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

更新了装备浏览界面，装备浏览添加搜索功能，搜索器使用了节流，只能实现单字关键词搜索

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

代码：

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
```



