<template>
  <div class="skin-list">
    <ul class="d-flex flex-wrap" style="padding: 0">
      <li
        v-for="item in clubs"
        :key="item._id"
        class="d-flex flex-col ai-center cp my-3"
        style="width: 25%"
      >
        <div class="front skin-item flex-1">
          <img style="max-height: 10rem; max-width: 100%" :src="item.icon" />
          <div class="screen d-flex flex-col jc-center ai-center">
            <router-link
              tag="i"
              :to="`/clubs/edit/${item._id}`"
              class="text-white mb-3 iconfont icon-bianji"
            ></router-link>
          </div>
        </div>
        <strong class="fs-xxl mt-3">{{ item.abbr }}</strong>
        <span class="fs-xxl mt-3">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { getClubList } from "@/api/admin/clubs.js";
import "@/assets/icons/iconfont.css";
export default {
  data() {
    return {
      clubs: [],
    };
  },
  methods: {
    async initClubs() {
      const { data: res } = await getClubList();
      this.clubs = res;
    },
  },
  created() {
    this.initClubs();
  },
};
</script>

<style lang="scss" scoped>
li {
  list-style: none;
}
.skin-item {
  position: relative;
  max-width: 14rem;
  height: 14rem;
  .screen {
    position: absolute;
    top: 0;
    width: 100%;
    height: 10rem;
    opacity: 0;
    background-color: #000;
    i {
      text-align: center;
      transform: scale(2.5);
    }
    .icon-shanchu:hover {
      opacity: 0.3;
    }
    .icon-bianji:hover {
      opacity: 0.3;
    }
  }
  &:hover .screen {
    opacity: 0.6;
  }
}
</style>
