<template>
  <div class="about">
    <el-form @submit.native.prevent="save" label-width="120px">
      <h1>{{ id ? "编辑" : "新建" }}符文</h1>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="符文种类">
        <el-select v-model="model.category" placeholder="请选择符文种类">
          <el-option
            v-for="item in runesCate"
            :key="item._id"
            :value="item._id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="符文等级">
        <el-select v-model="model.level" placeholder="请选择符文等级">
          <el-option
            ref="baseLocal"
            v-for="(item, index) in runesType"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="符文行数" v-if="model.level == '普通符文'">
        <el-select v-model="model.row" placeholder="请选择符文行数">
          <el-option
            ref="baseLocal"
            v-for="item in 3"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <i
          @mouseover="showTips"
          @mouseout="showTips"
          class="iconfont icon-bangzhu ml-2 tips"
        >
        </i>
        <span class="tips-info text-gray">测试信息：符文行数</span>
      </el-form-item>

      <el-form-item label="符文位置" v-if="model.level">
        <el-select v-model="model.col" placeholder="请选择符文位置">
          <el-option
            ref="baseLocal"
            v-for="item in 4"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <i
          @mouseover="showTips"
          @mouseout="showTips"
          class="iconfont icon-bangzhu ml-2 tips"
        >
        </i>
        <span class="tips-info text-gray">测试信息：符文位置</span>
      </el-form-item>

      <el-form-item label="功能">
        <el-input
          resize="none"
          type="textarea"
          :autosize="{ minRows: 3 }"
          v-model="model.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="图标" class="upload">
        <el-upload
          class="avatar-uploader"
          :action="uploadURL"
          :show-file-list="false"
          :on-success="afterUpload"
          :headers="getAuthHeaders()"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item
        ><el-button type="primary" native-type="submit"
          >提交</el-button
        ></el-form-item
      >
    </el-form>
  </div>
</template>

<script>
import "../assets/icons/iconfont.css";
import { createNewList, getListIdInfo, updateList } from "@/api/admin/runes.js";
import { getCategoryList } from "@/api/admin/categories.js";
export default {
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      model: {},
      runesCate: [],
      row: "",
      col: "",
      runesType: ["基石符文", "普通符文", "小符文"],
    };
  },
  methods: {
    // 提交
    async save() {
      if (this.id) {
        await updateList(this.id, this.model);
      } else {
        await createNewList(this.model);
      }
      this.$router.push("/runes/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    // 是以编辑的路由跳转进来的就触发该fetch，绑定数据到model上
    async fetch() {
      const { data: res } = await getListIdInfo(this.id);
      this.model = res;
    },
    async initRunesCate() {
      const { data: res } = await getCategoryList();
      this.runesCate = res.filter((ele) => {
        if (ele.parent) {
          return ele.parent.name === "符文种类";
        }
      });
    },
    afterUpload(res) {
      this.$set(this.model, "icon", res.url);
    },
    showTips(e) {
      if (e.target.nextElementSibling.style.opacity == 0) {
        e.target.nextElementSibling.style.opacity = 1;
      } else {
        e.target.nextElementSibling.style.opacity = 0;
      }
    },
  },
  created() {
    // 获取到分类options的选项数据
    this.id && this.fetch();
    // 获取到分类的符文种类
    this.initRunesCate();
  },
};
</script>

<style scoped>
.upload /deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.upload /deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.upload /deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.upload /deep/ .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.tips-info {
  opacity: 0;
  display: inline-block;
  transform: scale(0.7);
}
</style>
