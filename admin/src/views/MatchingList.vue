<template>
  <div class="matching-list">
    <!-- 比赛中列表 -->
    <strong class="fs-xxl">比赛中</strong>
    <div class="d-flex flex-col mb-5">
      <!-- 比赛列表 -->
      <div
        class="match-item my-3"
        style="border-radius: 5px"
        v-for="item in matchingList"
        :key="item._id"
      >
        <div
          style="background-color: #151517; border-radius: 7px"
          class="cp d-flex jc-around p-2 board-top"
          @click.self="upfold($event)"
        >
          <div style="max-height: 6rem; width: 8rem" class="d-flex jc-center">
            <img style="height: 100%" :src="item.blue.club.icon" alt="" />
          </div>
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
            <!-- 比赛时间 -->
            <div class="matching-time text-white">
              <c-time :start="parseInt(item.start)"></c-time>
            </div>
          </div>
          <div style="max-height: 6rem; width: 8rem" class="d-flex jc-center">
            <img style="height: 100%" :src="item.red.club.icon" alt="" />
          </div>
        </div>

        <div class="board-bot pt-4 bg-dark-2 d-flex jc-around">
          <div class="fs-xl text-white cp" @click="editMatch(item._id)">
            编辑比赛
          </div>
          <div class="fs-xl text-white cp" @click="selectMatch(item._id)">
            结束比赛
          </div>
        </div>
      </div>
      <div
        v-if="!matchingList.length"
        style="margin: 0 auto"
        class="fs-xxl my-5"
      >
        暂无比赛
      </div>
    </div>
    <!-- 未完成比赛 -->
    <strong class="fs-xxl">未完成比赛</strong>
    <div class="d-flex flex-col">
      <!-- 比赛列表 -->
      <div
        class="match-item my-3"
        style="border-radius: 5px"
        v-for="item in matchedList"
        :key="item._id"
      >
        <div
          style="background-color: #151517; border-radius: 7px"
          class="cp d-flex jc-around p-2 board-top"
          @click.self="upfold($event)"
        >
          <div style="max-height: 6rem; width: 8rem" class="d-flex jc-center">
            <img style="height: 100%" :src="item.blue.club.icon" alt="" />
          </div>
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
            <!-- 未开始 -->
            <div class="matching-time text-white">未开始</div>
          </div>
          <div style="max-height: 6rem; width: 8rem" class="d-flex jc-center">
            <img style="height: 100%" :src="item.red.club.icon" alt="" />
          </div>
        </div>

        <div class="board-bot pt-4 bg-dark-2 d-flex jc-around">
          <div class="fs-xl text-white cp" @click="editMatch(item._id)">
            编辑比赛
          </div>
          <div class="fs-xl text-white cp" @click="startMatch(item._id)">
            开始比赛
          </div>
        </div>
      </div>
      <div
        v-if="!matchedList.length"
        style="margin: 0 auto"
        class="fs-xxl my-5"
      >
        暂无比赛
      </div>
    </div>
    <el-dialog
      class="dialog"
      title="确认结束比赛吗？"
      :visible.sync="dialogVisible"
      width="50%"
      center
    >
      <span>请选择胜利方</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="overMatch('blue')"
          >&lt;===蓝色方</el-button
        >
        <el-button type="primary" @click="overMatch('red')"
          >红色方===&gt;</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import "@/assets/icons/iconfont.css";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  data() {
    return { dialogVisible: false, matchId: 0 };
  },
  computed: {
    ...mapState({
      matchingList: (state) => state.Match.matchingList,
      matchedList: (state) => state.Match.matchedList,
      match: (state) => state.Match.match,
      isOver: (state) => state.Match.isOver,
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
    upfold(e) {
      if (
        e.target.nextSibling.style.top == "50%" ||
        e.target.nextSibling.style.top == ""
      ) {
        e.target.nextSibling.style.top = "90%";
        e.target.parentNode.style.marginBottom = "40px";
      } else {
        e.target.nextSibling.style.top = "50%";
        e.target.parentNode.style.marginBottom = "13px";
      }
    },
    selectMatch(id) {
      this.matchId = id;
      this.dialogVisible = true;
    },
    async startMatch(id) {
      await this.getMatchIdInfo(id);
      this.update("start");
      this.$router.go(0);
    },
    editMatch(id) {
      this.$router.push(`/matches/edit/${id}`);
    },
    // 结束该场比赛并计分
    async overMatch(val) {
      // 获取到对应比赛的信息
      await this.getMatchIdInfo(this.matchId);
      // 更新对应比赛信息
      this.update(val);
      this.dialogVisible = false;
      if (this.isOver) {
        this.$router.push("/matches/list");
      } else {
        this.$message.success("比赛已结束");
        this.$router.push("/matches/matching");
      }
    },
  },
  created() {
    this.getMatchList();
  },
  // mounted() {
  //   setTimeout(() => {
  //     console.log(this.matchingList);
  //     console.log(this.matchedList);
  //   }, 100);
  // },
};
</script>

<style lang="scss">
.match-item {
  position: relative;
  transition: all 0.5s ease;
  .board-top {
    position: relative;
    z-index: 999;
  }
  .board-bot {
    position: absolute;
    top: 50%;
    border-radius: 7px;
    width: 100%;
    height: 3.5rem;
    transition: all 0.5s ease;
  }
}
.dialog {
  position: relative;
}
</style>
