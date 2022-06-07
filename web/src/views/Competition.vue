<template>
  <div class="compitition mt-3">
    <!-- 比赛中 -->
    <strong class="fs-xxl">正在比赛中</strong>
    <div
      class="matching d-flex flex-col ai-center bg-black-1 py-2 mb-3"
      v-for="item in matchingList"
      :key="item._id"
    >
      <!-- 上部分 -->
      <div class="top d-flex jc-around ai-center w-100">
        <img style="width: 5rem" :src="item.blue.club.icon" alt="" />
        <div class="score-board">
          <span class="score">{{ item.blue.score }}</span>
          <span style="font-size: 1.5rem" class="text-white mx-3">:</span>
          <span class="score">{{ item.red.score }}</span>
        </div>
        <img style="width: 5rem" :src="item.red.club.icon" alt="" />
      </div>
      <!-- 中部分 -->
      <div class="mid my-2">
        <c-time :start="parseInt(item.start)" class="text-white"></c-time>
      </div>

      <!-- 下部分 -->
      <div class="bot w-100 d-flex">
        <div class="team-blue flex-1 d-flex jc-start">
          <div v-for="subitem in item.blue" :key="subitem._id">
            <img
              v-if="subitem.hero"
              :src="subitem.player.icon"
              alt=""
              class="w-100"
            />
          </div>
        </div>
        <div class="team-red flex-1 d-flex jc-end">
          <div v-for="subitem in item.red" :key="subitem._id">
            <img
              v-if="subitem.player"
              :src="subitem.player.icon"
              alt=""
              class="w-100"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 未完成 -->
    <strong class="fs-xxl">未完成</strong>
    <div
      class="matched d-flex flex-col ai-center bg-black-1 py-2 mb-3"
      v-for="item in matchedList"
      :key="item._id"
    >
      <!-- 上部分 -->
      <div class="top d-flex jc-around ai-center w-100">
        <img style="width: 5rem" :src="item.blue.club.icon" alt="" />
        <div class="score-board">
          <span class="score">{{ item.blue.score }}</span>
          <span style="font-size: 1.5rem" class="text-white mx-3">:</span>
          <span class="score">{{ item.red.score }}</span>
        </div>
        <img style="width: 5rem" :src="item.red.club.icon" alt="" />
      </div>
      <!-- 中部分 -->
      <div class="mid my-2">
        <c-time
          :start="parseInt(item.start)"
          :matched="true"
          class="text-white"
        ></c-time>
      </div>

      <!-- 下部分 -->
      <div class="bot w-100 d-flex">
        <div class="team-blue flex-1 d-flex jc-start">
          <div v-for="subitem in item.blue" :key="subitem._id">
            <img
              v-if="subitem.hero"
              :src="subitem.player.icon"
              alt=""
              class="w-100"
            />
          </div>
        </div>
        <div class="team-red flex-1 d-flex jc-end">
          <div v-for="subitem in item.red" :key="subitem._id">
            <img
              v-if="subitem.player"
              :src="subitem.player.icon"
              alt=""
              class="w-100"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 已结束 -->
    <strong class="fs-xxl">已结束</strong>
    <div
      class="over d-flex flex-col ai-center bg-black-1 py-2"
      v-for="item in overList"
      :key="item._id"
    >
      <!-- 上部分 -->
      <div class="top d-flex jc-around ai-center w-100">
        <img style="width: 5rem" :src="item.blue.club.icon" alt="" />
        <div class="score-board">
          <span class="score">{{ item.blue.score }}</span>
          <span style="font-size: 1.5rem" class="text-white mx-3">:</span>
          <span class="score">{{ item.red.score }}</span>
        </div>
        <img style="width: 5rem" :src="item.red.club.icon" alt="" />
      </div>
      <!-- 下部分 -->
      <div class="mid my-2">
        <c-time
          :start="parseInt(item.start)"
          :over="true"
          :end="parseInt(item.end)"
          class="text-white"
        ></c-time>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      matchingList: (state) => state.Matches.matchingList,
      matchedList: (state) => state.Matches.matchedList,
      overList: (state) => state.Matches.overList,
    }),
  },
  methods: {
    ...mapActions("Matches", {
      getMatchList: "getMatchList",
    }),
  },
  created() {
    this.getMatchList();
  },
};
</script>

<style lang="scss">
.score {
  border-radius: 5px;
  padding: 0.7rem;
  font-size: 1.5rem;
  background-color: #fff;
}
</style>
