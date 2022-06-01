<template>
  <div class="about">
    <el-form @submit.native.prevent="save">
      <h1>{{ id ? "编辑" : "新建" }}广告位</h1>
      <el-form-item label="广告名字">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="model.items.push({})"
          ><i class="el-icon-plus"></i> 添加广告位</el-button
        >
        <el-row
          v-for="(item, index) in model.items"
          :key="index"
          style="flex-wrap: wrap"
          type="flex"
        >
          <el-col :md="24">
            <el-form-item label="广告链接URL">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <p>图标</p>
            <el-form-item class="upload">
              <el-upload
                class="avatar-uploader"
                :action="uploadURL"
                :show-file-list="false"
                :on-success="(res) => $set(item, 'image', res.url)"
                :headers="getAuthHeaders()"
              >
                <!-- afterUpload指的是在上传完毕之后触发的方法 -->
                <!-- action是指上传的地址 -->
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                size="small"
                @click="model.items.splice(index, 1)"
                >删除</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
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
import { createNewList, getListIdInfo, updateList } from "@/api/admin/ads.js";
export default {
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      model: {
        items: [],
      },
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
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    // 是以编辑的路由跳转进来的就触发该fetch，绑定数据到model上
    async fetch() {
      const { data: res } = await getListIdInfo(this.id);
      this.model = Object.assign({}, this.model, res);
    },
  },
  created() {
    // 获取到分类options的选项数据
    this.id && this.fetch();
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
  min-width: 7rem;
  height: 7rem;
  line-height: 7rem;
  text-align: center;
}
.upload /deep/ .avatar {
  width: 7rem;
  height: 7rem;
  display: block;
}
</style>
