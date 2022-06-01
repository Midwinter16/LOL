<template>
  <div>
    <router-link
      tag="div"
      :to="`article/${item._id}`"
      class="cardItem d-flex jc-between mb-5"
      v-for="item in news"
      :key="item._id"
    >
      <div class="d-flex flex-2 info flex-col jc-between">
        <div class="artical-info">
          <span v-if="item.topStatus && showTop" class="top-span fs-lg p-1 px-2"
            >置顶</span
          ><span>{{ item.title }}</span>
        </div>
        <div class="author-info">
          <span
            v-if="showHero"
            class="related-hero mr-3 px-2 bg-primary text-white fs-xs"
            >{{ item.relatedHero.title }}</span
          >
          <span class="author-name fs-xs text-gray">{{ item.author }}</span>
          <span v-if="showClicks" class="ml-2 fs-xs text-gray"
            >阅读量：{{ item.clicks }}</span
          >
        </div>
      </div>
      <img class="cover flex-1" :src="item.cover" alt="" />
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    news: {
      type: Array,
      required: true,
    },
    showTop: {
      type: Boolean,
      default: true,
    },
    showClicks: {
      type: Boolean,
      default: false,
    },
    showHero: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.cardItem {
  height: 4rem;
}
.related-hero {
  border-radius: 10px;
}
</style>
