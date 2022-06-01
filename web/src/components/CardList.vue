<template>
  <c-card :icon="icon" :title="title">
    <!-- 导航区域 -->
    <div class="px-4 card-nav mt-3 nav jc-between fs-lg">
      <div class="nav-item" v-for="(item, index) in categories" :key="index">
        <span
          class="cp"
          @click="changeActive(index)"
          :class="{ active: index == active }"
          >{{ item.name }}</span
        >
      </div>
    </div>
    <!-- 主体部分 -->
    <div class="card-body mt-3">
      <div class="swiper" :class="'swiper' + this.icon" ref="list">
        <div class="swiper-wrapper">
          <div
            v-for="(item, index) in categories"
            :key="index"
            class="swiper-slide d-flex flex-col fs-lg"
          >
            <slot name="item" :category="item"></slot>
          </div>
        </div>
      </div>
    </div>
  </c-card>
</template>

<script>
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
    },
  },
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    // 同步swiper滑动
    changeActive(index) {
      this.$refs.list.swiper.slideTo(index);
    },
  },
  mounted() {
    const swiper = new Swiper(`.swiper${this.icon}`, {
      speed: 400,
      spaceBetween: 100,
    });
    // 要在swiper上使用vue的参数，就要独立写出来，否则卸载Swiper构造函数内只能获取到swiper本身的数据
    swiper.on("slideChange", () => {
      this.active = this.$refs.list.swiper.activeIndex;
    });
  },
};
</script>

<style></style>
