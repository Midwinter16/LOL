<template>
  <div class="bg-white">
    <!-- 搜索栏 -->
    <div class="search-header d-flex p-3 ai-center jc-between">
      <div class="search d-flex ai-center py-2 bg-light" style="width: 70%">
        <i class="iconfont icon-sousuo mx-2"></i>
        <el-input
          id="input"
          size="small"
          placeholder="搜索物品(只允许输入一个字符)"
          v-model="input"
          maxlength="1"
        ></el-input>
      </div>
      <div class="filter d-flex ai-center">
        <i class="iconfont icon-shaixuan"></i>
        <span class="mx-2">筛选</span>
      </div>
    </div>

    <!-- 普通 -->
    <c-card-2
      v-if="normal.length != 0"
      title="普通"
      class="fs-xl d-flex flex-wrap"
    >
      <div
        v-for="item in normal"
        :key="item._id"
        class="d-flex flex-col jc-center ai-center px-4"
        style="width: 25%"
      >
        <img
          @click="dialog(item.description)"
          style="width: 100%"
          :src="item.icon"
          alt=""
        />
        <span class="fs-xs">{{ item.name }}</span>
      </div>
    </c-card-2>
    <!-- 史诗 -->
    <c-card-2
      v-if="epic.length != 0"
      title="史诗"
      class="fs-xl d-flex flex-wrap"
    >
      <div
        v-for="item in epic"
        :key="item._id"
        class="d-flex flex-col jc-center ai-center px-4"
        style="width: 25%"
      >
        <img
          @click="dialog(item.description)"
          style="width: 100%"
          :src="item.icon"
          alt=""
        />
        <span class="fs-xs">{{ item.name }}</span>
      </div>
    </c-card-2>
    <!-- 传说 -->
    <c-card-2
      v-if="legend.length != 0"
      title="传说"
      class="fs-xl d-flex flex-wrap"
    >
      <div
        v-for="item in legend"
        :key="item._id"
        class="d-flex flex-col jc-center ai-center px-4"
        style="width: 25%"
      >
        <img
          @click="dialog(item.description)"
          style="width: 100%"
          :src="item.icon"
          alt=""
        />
        <span class="fs-xs">{{ item.name }}</span>
      </div>
    </c-card-2>
    <!-- 神话 -->
    <c-card-2
      v-if="myth.length != 0"
      title="神话"
      class="fs-xl d-flex flex-wrap"
    >
      <div
        v-for="item in myth"
        :key="item._id"
        class="d-flex flex-col jc-center ai-center px-4"
        style="width: 25%"
      >
        <img
          @click="dialog(item.description)"
          style="width: 100%"
          :src="item.icon"
          alt=""
        />
        <span class="fs-xs">{{ item.name }}</span>
      </div>
    </c-card-2>
    <el-dialog
      title="装备详情"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <span>{{ equipsDesc }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getEquipsList } from "@/api/plugins/Item.js";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return { input: "", dialogVisible: false, equipsDesc: "" };
  },
  computed: {
    ...mapState({
      normal: (state) => state.Equips.normal,
      epic: (state) => state.Equips.epic,
      legend: (state) => state.Equips.legend,
      myth: (state) => state.Equips.myth,
    }),
  },
  methods: {
    ...mapMutations("Equips", {
      classify: "classify",
      search: "search",
    }),
    handleClose() {
      return;
    },
    async initEquips() {
      const { data: res } = await getEquipsList();
      this.classify(res);
    },
    dialog(desc) {
      this.equipsDesc = desc;
      this.dialogVisible = true;
    },
  },
  watch: {
    input() {
      this.initEquips();
    },
  },
  created() {
    this.initEquips();
  },
  mounted() {
    // 搜索框节流
    let debounce = (func, time = 500) => {
      let timer = null;
      return function () {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(func, time);
      };
    };
    let input = document.getElementById("input");
    input.addEventListener(
      "keyup",
      debounce(() => {
        // 判断输入框是否还有内容，没有内容不触发
        if (input.value) {
          this.search(input.value);
        }
      })
    );
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/_variables.scss";
span {
  text-align: center;
}
.search {
  border: 1px solid gray;
  overflow: hidden;
  border-radius: 2.3rem;
  height: 2.3rem;
}
.el-input {
  ::v-deep .el-input__inner {
    border: 0;
    background-color: map-get($map: $colors, $key: "light");
    padding: 0;
  }
  ::v-deep .el-input__inner::placeholder {
    color: gray;
  }
}
</style>
