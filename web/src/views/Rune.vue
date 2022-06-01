<template>
  <div>
    <c-card-2 title="主副系符文">
      <!-- 符文类别 -->
      <div class="d-flex jc-around pb-4 px-1">
        <div
          @click="changeType(item)"
          v-for="(item, index) in runesType"
          :key="item._id"
          :class="`init${index}`"
        >
          <div
            class="shell d-flex jc-center p-1"
            :class="type === item.abb ? 'active' : ''"
          >
            <img
              style="background-color: black; border-radius: 50%"
              :src="item.icon"
              class="p-2 runes"
              alt=""
            />
          </div>
        </div>
      </div>
      <!-- 符文描述 -->
      <div class="desc pb-2 pl-2 fs-lg">
        <strong>{{ name }}</strong
        >：{{ description }}
      </div>
      <!-- 符文详情 -->
      <div class="px-4 details d-flex flex-col">
        <div class="base m-3 d-flex">
          <img
            @click="dialog(item.description)"
            style="width: 25%"
            v-for="item in baseRunes"
            :key="item._id"
            :src="item.icon"
            alt=""
          />
        </div>
        <div class="row-1 m-3 d-flex">
          <img
            @click="dialog(item.description)"
            style="width: 3rem"
            v-for="item in row1Runes"
            :key="item._id"
            :src="item.icon"
            alt=""
          />
        </div>
        <div class="row-2 m-3 d-flex">
          <img
            @click="dialog(item.description)"
            style="width: 3rem"
            v-for="item in row2Runes"
            :key="item._id"
            :src="item.icon"
            alt=""
          />
        </div>
        <div class="row-3 m-3 d-flex">
          <img
            @click="dialog(item.description)"
            style="width: 3rem"
            v-for="item in row3Runes"
            :key="item._id"
            :src="item.icon"
            alt=""
          />
        </div>
      </div>
      <!-- 符文信息描述 -->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="70%"
        :before-close="handleClose"
      >
        <span>{{ runesDesc }}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </c-card-2>
  </div>
</template>

<script>
import jm from "../assets/images_files/jm.png";
import zz from "../assets/images_files/zz.png";
import qd from "../assets/images_files/qd.png";
import jj from "../assets/images_files/jj.png";
import ws from "../assets/images_files/ws.png";
import { getRunesList } from "@/api/plugins/Item.js";
export default {
  data() {
    return {
      type: "jm",
      description: "",
      name: "1",
      baseRunes: [],
      row1Runes: [],
      row2Runes: [],
      row3Runes: [],
      runesType: [
        {
          _id: "923961",
          name: "精密",
          abb: "jm",
          desc: "强化攻击和持续伤害",
          icon: jm,
        },
        {
          _id: "923962",
          name: "主宰",
          abb: "zz",
          desc: "爆发伤害和近身手段",
          icon: zz,
        },
        {
          _id: "923963",
          name: "巫术",
          abb: "ws",
          desc: "强化技能和资源控制",
          icon: ws,
        },
        {
          _id: "923964",
          name: "坚决",
          abb: "jj",
          desc: "耐久和控制",
          icon: jj,
        },
        {
          _id: "923965",
          name: "启迪",
          abb: "qd",
          desc: "创造性的工具并扭转常规",
          icon: qd,
        },
      ],
      runesDesc: "",
      dialogVisible: false,
    };
  },

  methods: {
    changeType(item) {
      [this.type, this.name, this.description] = [
        item.abb,
        item.name,
        item.desc,
      ];
    },
    async initRunes() {
      const { data: res } = await getRunesList();
      this.runes = res;
    },
    dialog(desc) {
      this.runesDesc = desc;
      this.dialogVisible = true;
    },
    handleClose() {
      return;
    },
    changeRunesType(newVal) {
      let prepro = this.runes.filter((ele) => {
        return ele.category.name === newVal;
      });
      this.baseRunes = [];
      this.row1Runes = [];
      this.row2Runes = [];
      this.row3Runes = [];
      prepro.forEach((ele) => {
        if (!ele.row) {
          this.baseRunes.push(ele);
        } else {
          switch (ele.row) {
            case 1:
              this.row1Runes.push(ele);
              break;
            case 2:
              this.row2Runes.push(ele);
              break;
            case 3:
              this.row3Runes.push(ele);
              break;
          }
        }
      });
    },
  },
  watch: {
    name: {
      immediate: true,
      handler(newVal, oldVal) {
        if (!this.runes) {
          // 该数据是依赖一个异步的后端数据，此时只能使用setTimeout的特性，异步执行的宏任务，来执行函数
          setTimeout(() => {
            this.changeRunesType(newVal);
          }, 100);
          // 限制时间到100毫秒
        } else {
          this.changeRunesType(newVal);
        }
      },
    },
  },
  created() {
    this.initRunes();
  },
  mounted() {
    this.type = "jm";
    this.name = "精密";
    this.description = "强化攻击和持续伤害";
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";
.shell {
  border-radius: 50%;
  border: 2px solid transparent;
}
.active {
  border: 2px solid map-get($map: $colors, $key: "golden");
}
.desc {
  border-bottom: 1px solid map-get($map: $colors, $key: "border-color-2");
}
</style>
