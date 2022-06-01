import Vue from "vue";
import VueRouter from "vue-router";

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/news",
    component: () => import("@/views/Home"),
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
  },
  {
    path: "/article/:id",
    name: "Article",
    component: () => import("@/views/Article.vue"),
    props: true,
  },
  {
    path: "/heroes/:id",
    name: "Hero",
    component: () => import("@/views/Hero"),
    props: true,
  },
  {
    path: "/items",
    name: "Item",
    component: () => import("@/views/Item"),
    children: [
      {
        path: "equips",
        name: "Equip",
        component: () => import("@/views/Equip"),
      },
      {
        path: "runes",
        name: "Rune",
        component: () => import("@/views/Rune"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
