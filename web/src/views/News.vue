<template>
  <div>
    <!-- 轮播图 -->
    <div class="swiper swiperTop">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in adsList" :key="item._id">
          <img class="w-100" :src="item.cover" alt="" />
        </div>
      </div>
    </div>
    <!-- 导航 -->
    <c-nav
      name="mainNav"
      iconType="sprite_comm"
      :navList="nav_list"
      :rowNums="4"
    ></c-nav>
    <!-- 新闻资讯 -->
    <c-card-list
      v-if="isNewsLoad"
      icon="caidan"
      title="新闻资讯"
      :categories="categories"
    >
      <template #item="{ category }">
        <router-link
          tag="div"
          :to="`article/${news._id}`"
          v-for="(news, index) in category.newsList"
          :key="index"
          class="notes d-flex jc-between ai-center my-2 px-4"
        >
          <span>{{ news.categoryName }}</span>
          <span class="mx-2 split"></span>
          <span class="flex-1 ellipsis pr-3">{{ news.title }}</span>
          <span>{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </c-card-list>
    <!-- 英雄列表 -->
    <c-card-list
      v-if="isHeroLoad"
      icon="yingxiong"
      title="英雄列表"
      :categories="heroes"
    >
      <template #item="{ category }">
        <div class="d-flex px-4 flex-wrap">
          <router-link
            tag="div"
            :to="`/heroes/${item._id}`"
            v-for="(item, index) in foldStatus
              ? category.heroList
              : category.heroList.slice(0, 10)"
            :key="index"
            class="cp notes p-1 d-flex flex-col jc-between ai-center my-2"
            style="width: 20%"
          >
            <img style="width: 100%" :src="item.icon" alt="" />
            <span class="fs-xs">{{ item.title }}</span>
          </router-link>
        </div>
        <div class="w-100 pt-1 d-flex ai-center flex-col">
          <p class="m-0 text-center px-1 fs-sm text-dark-3">展示更多</p>
        </div>
      </template>
    </c-card-list>
  </div>
</template>

<script>
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import "../assets/icons/iconfont.css";
import { getNewsList, getHeroesList } from "../api/plugins/News.js";
import dayjs from "dayjs";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      nav_list: [
        {
          title: "在线客服",
          icon: "service",
          link: "service",
        },
        {
          title: "秩序殿堂",
          icon: "rules",
          link: "rules",
        },
        {
          title: "游戏资讯",
          icon: "gamenews",
          link: "news",
        },
        {
          title: "峡谷之巅",
          icon: "top",
          link: "top",
        },
        {
          title: "云顶之弈",
          icon: "chess",
          link: "chess",
        },
        {
          title: "攻略中心",
          icon: "strategy",
          link: "strategy-center",
        },
        {
          title: "LOL宇宙",
          icon: "universe",
          link: "universe",
        },
        {
          title: "微信绑定",
          icon: "wechat",
          link: "wechat",
        },
      ],
      categories: [],
      heroes: [],
      isHeroLoad: false,
      isNewsLoad: false,
      foldStatus: false,
    };
  },
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  methods: {
    ...mapActions("News", {
      getAdsList: "getAdsList",
    }),
    async initNewsList() {
      const { data: res } = await getNewsList();
      this.categories = res;
      this.isNewsLoad = true;
    },
    async initHeroesList() {
      const { data: res } = await getHeroesList();
      this.heroes = res;
      this.isHeroLoad = true;
    },
  },
  computed: {
    ...mapState({
      adsList: (state) => state.News.adsList,
    }),
  },
  created() {
    this.initNewsList();
    this.initHeroesList();
    // 初始化广告位信息
    this.getAdsList();
  },
  mounted() {
    // 顶部轮播图
    new Swiper(".swiperTop", {
      speed: 400,
      spaceBetween: 0,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      loop: true,
    });
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";

.icon_arrow {
  transform: rotate(180deg) scale(2);
}

.split {
  width: 1px;
  height: 1rem;
  background-color: map-get($map: $colors, $key: "black");
}
</style>
