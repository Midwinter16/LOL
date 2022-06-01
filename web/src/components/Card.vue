<template>
  <div class="card mt-3 bg-white py-4">
    <div class="card-header mb-3 pb-3 mx-4 d-flex jc-between">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <span class="fs-xl flex-1 px-2">{{ title }}</span>
      <i v-if="isShowMore" class="iconfont icon-gengduo"></i>
    </div>
    <slot></slot>
  </div>
</template>

<script>
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
    isShowMore: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.card-header {
  border-bottom: 1px solid map-get($map: $colors, $key: "border-color");
}
</style>
