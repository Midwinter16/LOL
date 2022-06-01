import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
    meta: {
      isPublic: true,
    },
  },
  {
    path: "/",
    name: "Main",
    component: () => import("@/views/Main.vue"),
    children: [
      // 分类
      {
        path: "/categories/create",
        component: () => import("@/views/CategoryEdit.vue"),
      },
      {
        path: "/categories/list",
        component: () => import("@/views/CategoryList.vue"),
      },
      {
        path: "/categories/edit/:id",
        props: true,
        component: () => import("@/views/CategoryEdit.vue"),
      },
      // 装备和物品
      {
        path: "/equips/create",
        component: () => import("@/views/EquipEdit.vue"),
      },
      {
        path: "/equips/list",
        component: () => import("@/views/EquipList.vue"),
      },
      {
        path: "/equips/edit/:id",
        props: true,
        component: () => import("@/views/EquipEdit.vue"),
      },
      // 英雄
      {
        path: "/heroes/create",
        component: () => import("@/views/HeroEdit.vue"),
      },
      {
        path: "/heroes/list",
        component: () => import("@/views/HeroList.vue"),
      },
      {
        path: "/heroes/edit/:id",
        props: true,
        component: () => import("@/views/HeroEdit.vue"),
      },
      // 文章
      {
        path: "/articles/create",
        component: () => import("@/views/ArticleEdit.vue"),
      },
      {
        path: "/articles/list",
        component: () => import("@/views/ArticleList.vue"),
      },
      {
        path: "/articles/edit/:id",
        props: true,
        component: () => import("@/views/ArticleEdit.vue"),
      },
      // 广告位
      {
        path: "/ads/create",
        component: () => import("@/views/AdsEdit.vue"),
      },
      {
        path: "/ads/list",
        component: () => import("@/views/AdsList.vue"),
      },
      {
        path: "/ads/edit/:id",
        props: true,
        component: () => import("@/views/AdsEdit.vue"),
      },
      // 用户名
      {
        path: "/admin_users/create",
        component: () => import("@/views/AdminUsersEdit.vue"),
      },
      {
        path: "/admin_users/list",
        component: () => import("@/views/AdminUsersList.vue"),
      },
      {
        path: "/admin_users/edit/:id",
        props: true,
        component: () => import("@/views/AdminUsersEdit.vue"),
      },
      // 符文
      {
        path: "/runes/create",
        component: () => import("@/views/RuneEdit.vue"),
      },
      {
        path: "/runes/list",
        component: () => import("@/views/RuneList.vue"),
      },
      {
        path: "/runes/edit/:id",
        props: true,
        component: () => import("@/views/RuneEdit.vue"),
      },
      // 战队
      {
        path: "/clubs/create",
        component: () => import("@/views/ClubEdit.vue"),
      },
      {
        path: "/clubs/list",
        component: () => import("@/views/ClubList.vue"),
      },
      {
        path: "/clubs/edit/:id",
        props: true,
        component: () => import("@/views/ClubEdit.vue"),
      },
      // 选手
      {
        path: "/players/create",
        component: () => import("@/views/PlayerEdit.vue"),
      },
      {
        path: "/players/list",
        component: () => import("@/views/PlayerList.vue"),
      },
      {
        path: "/players/edit/:id",
        props: true,
        component: () => import("@/views/PlayerEdit.vue"),
      },
      // 皮肤
      {
        path: "/skins/create",
        component: () => import("@/views/SkinEdit.vue"),
      },
      {
        path: "/skins/list",
        component: () => import("@/views/SkinList.vue"),
      },
      {
        path: "/skins/edit/:id",
        props: true,
        component: () => import("@/views/SkinEdit.vue"),
      },
      // 比赛
      {
        path: "/matches/create",
        component: () => import("@/views/MatchEdit.vue"),
      },
      {
        path: "/matches/list",
        component: () => import("@/views/MatchList.vue"),
      },
      {
        path: "/matches/edit/:id",
        props: true,
        component: () => import("@/views/MatchEdit.vue"),
      },
      {
        path: "/matches/matching",
        component: () => import("@/views/MatchingList.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.getItem("token")) {
    return router.push("/login");
  }
  next();
});

export default router;
