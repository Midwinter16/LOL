<template>
  <div class="skin-list">
    <ul class="d-flex flex-wrap">
      <li
        v-for="item in skins"
        :key="item._id"
        class="d-flex flex-col ai-center cp mx-2"
      >
        <div class="front skin-item">
          <img style="width: 100%" :src="item.cover" />
          <div class="screen d-flex flex-col jc-center ai-center">
            <router-link
              tag="i"
              :to="`/skins/edit/${item._id}`"
              class="text-white mb-3 iconfont icon-bianji"
            ></router-link>
            <i
              @click="deleteSkin(item._id, item.name)"
              class="text-white mt-3 iconfont icon-shanchu"
            ></i>
          </div>
        </div>
        <span class="fs-xs mt-1">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSkinList, deleteSkinId } from "@/api/admin/skins.js";
import "@/assets/icons/iconfont.css";
export default {
  data() {
    return {
      skins: [],
    };
  },
  methods: {
    async initSkins() {
      const { data: res } = await getSkinList();
      this.skins = res;
    },
    deleteSkin(id, name) {
      this.$confirm(`是否删除"${name}"皮肤`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await deleteSkinId(id);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.initSkins();
      });
    },
  },
  created() {
    this.initSkins();
  },
};
</script>

<style lang="scss">
li {
  list-style: none;
}
.skin-item {
  position: relative;
  width: 7rem;
  height: auto;
  .screen {
    position: absolute;
    top: 0;
    width: 100%;
    height: 165px;
    opacity: 0;
    background-color: #000;
    i {
      text-align: center;
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
