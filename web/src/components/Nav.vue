<template>
  <div class="nav_bar d-flex flex-wrap mt-3 bg-white">
    <router-link
      :to="`/${item.link}`"
      tag="div"
      class="nav_item d-flex flex-col ai-center my-3"
      :class="name"
      :style="`width: ${100 / rowNums}%`"
      v-for="(item, index) in navList"
      :key="index"
    >
      <i :class="`text-center ${iconType} icon-${item.icon} mt-1`"></i>
      <div class="text-center nav_label fs-md pt-3 text-dark-3">
        {{ item.title }}
      </div>
    </router-link>
    <div v-if="isFold" class="w-100 pt-1 bg-light d-flex ai-center flex-col">
      <i class="sprite_topfoot icon_arrow mt-1"></i>
      <p class="m-0 text-center px-1 fs-sm text-dark-3">收起</p>
    </div>
  </div>
</template>

<script>
import "../assets/icons/iconfont.css";
export default {
  props: {
    navList: {
      type: Array,
      required: true,
    },
    isFold: {
      type: Boolean,
      default: false,
    },
    rowNums: {
      required: true,
      type: Number,
    },
    name: {
      required: true,
      type: String,
    },
    // sprite_comm iconfont
    iconType: {
      required: true,
      type: String,
    },
  },
  mounted() {
    let list = document.querySelectorAll(`.${this.name}`);
    list.forEach((ele, index) => {
      if ((index + 1) % this.rowNums != 0) {
        ele.style.borderRight = "1px solid #bbb";
      } else {
        ele.style.borderRight = "none";
      }
    });
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.nav_bar {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  .nav_item {
    overflow: hidden;
    i {
      transform: scale(1.5);
    }
  }
}
</style>
