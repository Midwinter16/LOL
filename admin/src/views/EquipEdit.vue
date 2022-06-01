<template>
  <div class="about">
    <el-form @submit.native.prevent="save" label-width="120px">
      <h1>{{ id ? "编辑" : "新建" }}物品</h1>
      <el-form-item label="名字">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="品级">
        <el-select v-model="model.level" placeholder="请选择装备品级">
          <el-option
            v-for="item in levels"
            :key="item._id"
            :value="item._id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="装备描述">
        <el-input
          resize="none"
          type="textarea"
          :autosize="{ minRows: 2 }"
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
import {
  createNewList,
  getListIdInfo,
  updateList,
} from "@/api/admin/equips.js";
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
      levels: [],
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
      this.$router.push("/equips/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    // 是以编辑的路由跳转进来的就触发该fetch，绑定数据到model上
    async fetch() {
      const { data: res } = await getListIdInfo(this.id);
      console.log(res);
      this.model = res;
    },
    async initCategories() {
      const { data: res } = await getCategoryList();
      let prepro = res.filter((ele) => {
        if (ele.parent) {
          return ele.parent.name == "装备等级";
        }
      });
      this.levels = prepro;
    },
    afterUpload(res) {
      this.$set(this.model, "icon", res.url);
    },
  },
  created() {
    // 获取到分类options的选项数据
    this.id && this.fetch();
    // 初始化装备分类
    this.initCategories();
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
</style>
