<template>
  <div>
    <div class="header px-2 bg-primary d-flex jc-around ai-center">
      <div class="title text-white">银龙重铸之日</div>
      <img
        src="../assets/images_files/logo-public.png"
        alt=""
        style="height: 30px"
      />
      <div class="title text-white">骑士归来之时</div>
    </div>
    <div class="nav main-nav bg-white jc-around pt-3 pb-2">
      <div
        class="nav-item"
        v-for="(item, index) in navName"
        :key="index"
        @click="changeSwiperActive(index)"
      >
        <router-link
          to="/"
          class="text-primary"
          :class="active == index ? 'active' : ''"
          >{{ item }}</router-link
        >
      </div>
    </div>
    <!-- <router-view></router-view> -->
    <div class="swiper swiper-main" ref="list">
      <div class="swiper-wrapper">
        <div class="swiper-slide" data-history="news">
          <News></News>
        </div>
        <div class="swiper-slide" data-history="strategy">
          <Strategy></Strategy>
        </div>
        <div class="swiper-slide" data-history="match">
          <Competition></Competition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import News from "@/views/News.vue";
import Strategy from "@/views/Strategy.vue";
import Competition from "@/views/Competition.vue";

export default {
  data() {
    return {
      active: 0,
      navName: ["资讯", "攻略", "赛事"],
    };
  },
  methods: {
    changeSwiperActive(val) {
      this.$refs.list.swiper.slideTo(val);
    },
  },

  mounted() {
    const swiperMain = new Swiper(".swiper-main", {
      speed: 400,
      spaceBetween: 50,
      history: {
        replaceState: true,
        key: "",
      },
    });
    swiperMain.on("slideChange", () => {
      this.active = this.$refs.list.swiper.activeIndex;
    });
    // 加载页面时active初始值;
    this.active = this.$refs.list.swiper.activeIndex;
  },

  components: {
    News,
    Strategy,
    Competition,
  },
};
</script>

<style lang="less">
.header {
  background: #2193b0; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #6dd5ed,
    #2193b0
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #6dd5ed,
    #2193b0
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  position: sticky;
  top: 0;
  z-index: 888;
}
.main-nav {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
