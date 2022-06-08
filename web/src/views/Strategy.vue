<template>
  <div>
    <!-- 导航 -->
    <c-nav
      name="strategyNav"
      iconType="iconfont"
      :navList="nav_list"
      :rowNums="2"
    ></c-nav>
    <c-card :isShowMore="false" title="热点资讯" icon="redian">
      <c-news-item
        class="px-4"
        :showClicks="true"
        :showTop="false"
        :news="hots"
      ></c-news-item>
    </c-card>
    <c-card :isShowMore="false" title="英雄攻略" icon="yingxiong">
      <div class="hero-icon d-flex px-4 jc-around">
        <div
          class="hero-item d-flex flex-col ai-center cp"
          v-for="item in recomList"
          :key="item._id"
          @click="active = item._id"
        >
          <img
            style="width: 3rem; border-radius: 50%"
            :src="item.icon"
            alt=""
          />
          <span>{{ item.name }}</span>
          <div
            class="arrow mt-2"
            :class="active === item._id ? 'active' : ''"
          ></div>
        </div>
        <div class="show-more bg-gray text-white pt-1">更多<br />英雄</div>
      </div>
      <c-news-item
        class="px-4"
        :news="relatedStrategy"
        :showTop="false"
      ></c-news-item>
      <div class="tips d-flex jc-center ai-center text-gray">
        <div v-if="relatedStrategy.length === 0">敬请期待</div>
        <div v-else-if="relatedStrategy.length < 3">期待更多攻略</div>
        <div v-else>展示更多</div>
      </div>
    </c-card>
    <c-card :isShowMore="false" title="攻略中心" icon="tutorial">
      <c-news-item
        class="px-4"
        :showHero="true"
        :news="allStrategies"
      ></c-news-item>
    </c-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      nav_list: [
        {
          title: "装备详情",
          icon: "zhuangbei",
          link: "items/equips",
        },
        {
          title: "符文介绍",
          icon: "jineng",
          link: "items/runes",
        },
      ],
      heroList: [],
      relatedStrategy: [],
    };
  },
  methods: {
    ...mapActions("Heroes", {
      getHeroesList: "getHeroesList",
    }),
    ...mapActions("Articles", {
      getAllArticle: "getAllArticle",
    }),
    resetRelatedStrategy(val) {
      this.recomList.some((ele) => {
        if (ele._id === val) {
          this.relatedStrategy = ele.relatedStrategies.slice(0, 3);
          return true;
        }
      });
    },
  },
  computed: {
    ...mapState({
      recomList: (state) => state.Heroes.recomList,
      initId: (state) => state.Heroes.initId,
      allStrategies: (state) => state.Articles.allStrategies,
      hots: (state) => state.Articles.hots,
    }),
    active() {
      return this.initId;
    },
  },
  watch: {
    // 监听active，更新strategies
    active(newValue) {
      this.resetRelatedStrategy(newValue);
    },
  },
  created() {
    // vuex
    this.getHeroesList();
    this.getAllArticle();
  },
  mounted() {
    setTimeout(() => {
      this.resetRelatedStrategy(this.initId);
    }, 100);
  },
};
</script>

<style lang="scss">
.cardItem {
  height: 4rem;
}
.hero-item {
  .arrow {
    background-color: white;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-top: 10px solid transparent;
  }
  .active {
    border-top: 10px solid gray;
  }
}
.show-more {
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  text-align: center;
}
</style>
