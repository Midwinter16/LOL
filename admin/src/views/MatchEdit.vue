<template>
  <div class="about">
    <el-form @submit.native.prevent="save">
      <h1>{{ id ? "编辑" : "新建" }}比赛</h1>
      <div class="d-flex jc-between">
        <div class="blue flex-1">
          <h1>蓝色方</h1>
          <el-form-item label="战队">
            <el-select v-model="model.blue.club">
              <el-option
                v-for="item in clubList"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上单选手">
            <div class="d-flex flex-col">
              <el-select
                class="mb-3"
                style="width: 200px"
                v-model="model.blue.top.player"
                placeholder="请选择选手"
              >
                <el-option
                  v-for="item in bluePlayersTop"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
              <el-select
                placeholder="请选择所选英雄"
                style="width: 200px"
                v-model="model.blue.top.hero"
              >
                <el-option
                  v-for="item in heroList"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="打野选手">
            <div class="d-flex flex-col">
              <el-select
                class="mb-3"
                style="width: 200px"
                v-model="model.blue.jug.player"
                placeholder="请选择选手"
              >
                <el-option
                  v-for="item in bluePlayersJug"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
              <el-select
                style="width: 200px"
                v-model="model.blue.jug.hero"
                placeholder="请选择所选英雄"
              >
                <el-option
                  v-for="item in heroList"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="中单选手">
            <div class="d-flex flex-col">
              <el-select
                class="mb-3"
                style="width: 200px"
                v-model="model.blue.mid.player"
                placeholder="请选择选手"
              >
                <el-option
                  v-for="item in bluePlayersMid"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
              <el-select
                style="width: 200px"
                v-model="model.blue.mid.hero"
                placeholder="请选择所选英雄"
              >
                <el-option
                  v-for="item in heroList"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="下路选手">
            <div class="d-flex flex-col">
              <el-select
                class="mb-3"
                style="width: 200px"
                v-model="model.blue.bot.player"
                placeholder="请选择选手"
              >
                <el-option
                  v-for="item in bluePlayersBot"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
              <el-select
                style="width: 200px"
                v-model="model.blue.bot.hero"
                placeholder="请选择所选英雄"
              >
                <el-option
                  v-for="item in heroList"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="辅助选手">
            <div class="d-flex flex-col">
              <el-select
                class="mb-3"
                style="width: 200px"
                v-model="model.blue.sub.player"
                placeholder="请选择选手"
              >
                <el-option
                  v-for="item in bluePlayersSub"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
              <el-select
                style="width: 200px"
                v-model="model.blue.sub.hero"
                placeholder="请选择所选英雄"
              >
                <el-option
                  v-for="item in heroList"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
        </div>
        <div class="red flex-1">
          <h1>红色方</h1>
          <el-form-item label="战队">
            <el-select v-model="model.red.club">
              <el-option
                v-for="item in clubList"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上单选手">
            <div class="d-flex flex-col">
              <el-select
                class="mb-3"
                style="width: 200px"
                v-model="model.red.top.player"
                placeholder="请选择选手"
              >
                <el-option
                  v-for="item in redPlayersTop"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
              <el-select
                style="width: 200px"
                v-model="model.red.top.hero"
                placeholder="请选择所选英雄"
              >
                <el-option
                  v-for="item in heroList"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="打野选手">
            <div class="d-flex flex-col">
              <el-select
                class="mb-3"
                style="width: 200px"
                v-model="model.red.jug.player"
                placeholder="请选择选手"
              >
                <el-option
                  v-for="item in redPlayersJug"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
              <el-select
                style="width: 200px"
                v-model="model.red.jug.hero"
                placeholder="请选择所选英雄"
              >
                <el-option
                  v-for="item in heroList"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="中单选手">
            <div class="d-flex flex-col">
              <el-select
                class="mb-3"
                style="width: 200px"
                v-model="model.red.mid.player"
                placeholder="请选择选手"
              >
                <el-option
                  v-for="item in redPlayersMid"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
              <el-select
                style="width: 200px"
                v-model="model.red.mid.hero"
                placeholder="请选择所选英雄"
              >
                <el-option
                  v-for="item in heroList"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="下路选手">
            <div class="d-flex flex-col">
              <el-select
                class="mb-3"
                style="width: 200px"
                v-model="model.red.bot.player"
                placeholder="请选择选手"
              >
                <el-option
                  v-for="item in redPlayersBot"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
              <el-select
                style="width: 200px"
                v-model="model.red.bot.hero"
                placeholder="请选择所选英雄"
              >
                <el-option
                  v-for="item in heroList"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="辅助选手">
            <div class="d-flex flex-col">
              <el-select
                class="mb-3"
                style="width: 200px"
                v-model="model.red.sub.player"
                placeholder="请选择选手"
              >
                <el-option
                  v-for="item in redPlayersSub"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
              <el-select
                style="width: 200px"
                v-model="model.red.sub.hero"
                placeholder="请选择所选英雄"
              >
                <el-option
                  v-for="item in heroList"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
        </div>
      </div>
      <el-form-item
        ><el-button type="primary" native-type="submit">提交</el-button
        ><el-button type="warning" @click="back()"
          >返回</el-button
        ></el-form-item
      >
    </el-form>
  </div>
</template>

<script>
import { getClubList } from "../api/admin/clubs.js";
import { updateMatch, createNewMatch } from "../api/admin/matches.js";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      model: {
        red: { top: {}, jug: {}, mid: {}, bot: {}, sub: {} },
        blue: { top: {}, jug: {}, mid: {}, bot: {}, sub: {} },
      },
      clubList: {},
    };
  },
  computed: {
    ...mapState({
      bluePlayersTop: (state) => state.Player.bluePlayersTop,
      bluePlayersJug: (state) => state.Player.bluePlayersJug,
      bluePlayersMid: (state) => state.Player.bluePlayersMid,
      bluePlayersBot: (state) => state.Player.bluePlayersBot,
      bluePlayersSub: (state) => state.Player.bluePlayersSub,
      redPlayersTop: (state) => state.Player.redPlayersTop,
      redPlayersJug: (state) => state.Player.redPlayersJug,
      redPlayersMid: (state) => state.Player.redPlayersMid,
      redPlayersBot: (state) => state.Player.redPlayersBot,
      redPlayersSub: (state) => state.Player.redPlayersSub,
      heroList: (state) => state.Hero.heroList,
    }),
  },
  filters: {
    translate(val) {
      switch (val) {
        case "top":
          return "上路";
        case "jug":
          return "打野";
        case "mid":
          return "中路";
        case "bot":
          return "下路";
        case "sub":
          return "辅助";
      }
    },
  },
  methods: {
    ...mapMutations("Player", {
      filterByBlue: "filterByBlue",
      filterByRed: "filterByRed",
    }),
    ...mapActions("Player", {
      getAllPlayers: "getAllPlayers",
    }),
    ...mapActions("Hero", {
      getHeroList: "getHeroList",
    }),
    back() {
      this.$router.back();
    },
    async save() {
      // 检查是否完全填写完成
      let checks = document.querySelectorAll("input[class=el-input__inner]");
      let valid = true;
      checks.forEach((ele) => {
        if (ele.value == "") {
          valid = false;
          ele.style.border = "1px solid red";
        }
      });
      setTimeout(() => {
        checks.forEach((ele) => {
          ele.style.border = "1px solid gray";
        });
      }, 3000);
      if (!valid) {
        this.$message.warning("请完善表单再提交");
        return;
      }
      if (this.id) {
        await updateMatch(this.id, this.model);
      } else {
        // 保存后设置开始时间
        this.model.start = Date.parse(new Date());
        await createNewMatch(this.model);
      }
      this.$router.push("/skins/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const { data: res } = await getSkinIdInfo(this.id);
      this.model = res;
    },
    async initClubList() {
      const { data: res } = await getClubList();
      this.clubList = res;
    },
  },
  created() {
    this.id && this.fetch();
    this.initClubList();

    // vuex
    this.getAllPlayers();
    this.getHeroList();
  },
  watch: {
    "model.blue.club"(val) {
      this.filterByBlue(val);
    },
    "model.red.club"(val) {
      this.filterByRed(val);
    },
  },
};
</script>

<style scoped></style>
