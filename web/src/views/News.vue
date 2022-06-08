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
      :categories="classAllArticle"
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
      :categories="classHeroList"
    >
      <template #item="{ category }">
        <div class="d-flex px-4 flex-wrap">
          <router-link
            tag="div"
            :to="`/heroes/${item._id}`"
            v-for="(item, index) in foldStatus
              ? category.heroList
              : category.heroList.slice(0, 8)"
            :key="index"
            class="cp notes p-1 d-flex flex-col jc-between ai-center my-2"
            style="width: 25%"
          >
            <img style="width: 100%" :src="item.icon" alt="" />
            <span class="fs-xs">{{ item.title }}</span>
          </router-link>
        </div>
        <div class="w-100 pt-1 d-flex ai-center flex-col">
          <p class="m-0 text-center px-1 fs-xl text-dark-3">展示更多</p>
        </div>
      </template>
    </c-card-list>
    <!-- 所有资讯 -->
    <c-card :isShowMore="false" title="全部资讯" icon="redian">
      <c-news-item
        class="px-4"
        :showClicks="false"
        :showTop="false"
        :news="limitList"
      ></c-news-item>
      <div class="text-center fs-lg" id="tips">{{ tips }}</div>
    </c-card>
  </div>
</template>

<script>
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import "../assets/icons/iconfont.css";
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
      isHeroLoad: false,
      isNewsLoad: false,
      foldStatus: false,
      limit: 0,
      limitList: [],
      tips: "下拉刷新",
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
    ...mapActions("Articles", {
      getAllArticle: "getAllArticle",
    }),
    ...mapActions("Heroes", {
      getHeroesList: "getHeroesList",
    }),
  },
  computed: {
    ...mapState({
      adsList: (state) => state.News.adsList,
      classAllArticle: (state) => state.Articles.classAllArticle,
      classHeroList: (state) => state.Heroes.classHeroList,
      allArticle: (state) => state.Articles.allArticle,
    }),
  },
  watch: {
    classAllArticle() {
      this.isNewsLoad = true;
    },
    classHeroList() {
      this.isHeroLoad = true;
    },
    limit: {
      handler() {
        setTimeout(() => {
          let min = Math.min(this.limit, this.allArticle.length - 1);
          this.limitList = this.allArticle.slice(0, min);
        }, 1000);
      },
    },
  },
  created() {
    // vuex
    // 初始化广告位信息
    this.getAdsList();
    // 初始化文章
    this.getAllArticle();
    // 初始化英雄列表
    this.getHeroesList();
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
    setTimeout(() => {
      this.limit = 5;
    }, 1000);
    // 节流监听滚动距离
    let throttle = (func, time) => {
      let timer = null;
      return function () {
        if (!timer) {
          timer = setTimeout(() => {
            func();
            timer = null;
          }, time);
        }
      };
    };
    window.onscroll = throttle(() => {
      // 节流作用
      let timer = null;
      // 获取tips距离顶部高度
      let ViewHeight = document.querySelector("#tips").offsetTop;

      //为了保证兼容性，这里取两个值，哪个有值取哪一个
      //scrollTop就是触发滚轮事件时滚轮的高度
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 190) {
        this.isNewsLoad = true;
      }
      if (scrollTop + 790 >= ViewHeight && !timer && this.tips != "加载完成") {
        this.tips = "加载中";
        timer = setTimeout(() => {
          this.limit += 5;
          if (this.limit > this.allArticle.length) {
            this.tips = "加载完成";
          } else {
            this.tips = "下拉刷新";
          }
        }, 1000);
      }
    }, 100);
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
