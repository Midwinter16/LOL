<template>
  <div>
    <c-header title="资料查询"></c-header>
    <div class="nav d-flex jc-around ai-center fs-lg pt-3 pb-2 bg-white">
      <span
        @click="$router.push('/items/equips')"
        class="pb-1"
        :class="type === 'equips' ? 'active' : ''"
        >装备</span
      >
      <span
        @click="$router.push('/items/runes')"
        class="pb-1"
        :class="type === 'runes' ? 'active' : ''"
        >符文</span
      >
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "",
    };
  },
  watch: {
    $route() {
      this.type = this.$route.path.replace("/items/", "");
    },
  },
  mounted() {
    this.type = this.$route.path.replace("/items/", "");
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";
.nav {
  border-bottom: 1px solid map-get($map: $colors, $key: "border-color-2");
  span {
    border-bottom: 3px solid transparent;
  }
  .active {
    border-bottom: 3px solid black;
  }
}
</style>
