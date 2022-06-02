<template>
  <div class="matching-list">
    <strong class="fs-xxl">比赛历史</strong>
    <div class="d-flex flex-col">
      <!-- 比赛列表 -->
      <div
        class="match-item mt-3 mb-5"
        style="border-radius: 5px"
        v-for="item in matchList"
        :key="item._id"
      >
        <div
          style="background-color: #151517; border-radius: 7px"
          class="d-flex jc-around p-2 board-top"
        >
          <!-- 蓝方 -->
          <div style="max-height: 6rem; width: 8rem" class="d-flex jc-center">
            <img style="height: 100%" :src="item.blue.club.icon" alt="" />
          </div>
          <img
            style="width: 3rem; height: 2rem; align-self: center"
            src="../assets/images/win.png"
            alt=""
            :class="item.winer == 'red' ? 'hidden' : ''"
          />
          <!-- 比分 -->
          <div class="score jc-around ai-center d-flex flex-col">
            <!-- 计分板 -->
            <div class="score-board d-flex ai-center">
              <strong
                style="border-radius: 7px"
                class="blue-score fs-xxl p-3 bg-light"
                >{{ item.blue.score }}</strong
              >
              <strong class="text-white mx-3">:</strong>
              <strong
                style="border-radius: 7px"
                class="red-score fs-xxl p-3 bg-light"
                >{{ item.red.score }}</strong
              >
            </div>
          </div>
          <img
            style="width: 3rem; height: 2rem; align-self: center"
            src="../assets/images/win.png"
            alt=""
            :class="item.winer == 'blue' ? 'hidden' : ''"
          />
          <!-- 红方 -->
          <div style="max-height: 6rem; width: 8rem" class="d-flex jc-center">
            <img style="height: 100%" :src="item.red.club.icon" alt="" />
          </div>
        </div>
        <!-- 比赛信息 -->
        <div
          class="infos pt-3 pb-1 bg-dark-2 d-flex flex-col ai-center jc-around text-white"
        >
          <strong class="">结束于 {{ item.end | format1 }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/icons/iconfont.css";
import { mapActions, mapMutations, mapState } from "vuex";
import dayjs from "dayjs";
export default {
  data() {
    return { dialogVisible: false, matchId: 0 };
  },
  computed: {
    ...mapState({
      matchList: (state) => state.Match.matchOverList,
      match: (state) => state.Match.match,
    }),
  },
  methods: {
    ...mapActions("Match", {
      getMatchList: "getMatchList",
      getMatchIdInfo: "getMatchIdInfo",
    }),
    ...mapMutations("Match", {
      update: "update",
    }),
    // 展开操作
    selectMatch(id) {
      this.matchId = id;
      this.dialogVisible = true;
    },
  },
  filters: {
    format1(val) {
      return dayjs(parseInt(val)).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  created() {
    this.getMatchList();
  },
};
</script>

<style lang="scss">
.match-item {
  position: relative;
  .board-top {
    position: relative;
    z-index: 999;
  }
  .infos {
    position: absolute;
    top: 90%;
    border-radius: 7px;
    width: 100%;
    height: 3rem;
    transition: all 0.5s ease;
  }
}
.dialog {
  position: relative;
}
.hidden {
  opacity: 0;
}
</style>
