<template>
  <div class="item-header bg-white py-3 border-bottom">
    <i
      @click="$router.push('/strategy')"
      class="iconfont icon-youjiantou ml-2"
    ></i>
    <div class="fs-xl">{{ title }}</div>
  </div>
</template>

<script>
import "@/assets/icons/iconfont.css";
export default {
  props: {
    title: {
      required: true,
      type: String,
    },
  },
};
</script>

<style lang="scss">
.item-header {
  position: sticky;
  top: 0;
  width: 100%;
  .icon-youjiantou {
    position: absolute;
    left: 0;
  }
  div {
    text-align: center;
  }
}
</style>
