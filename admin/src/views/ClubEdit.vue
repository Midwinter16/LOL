<template>
  <div class="about">
    <el-form @submit.native.prevent="save" label-width="120px">
      <h1>{{ id ? "编辑" : "新建" }}战队</h1>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="简称">
        <el-input v-model="model.abbr"></el-input>
      </el-form-item>
      <el-form-item label="图标" class="upload">
        <el-upload
          class="avatar-uploader"
          :action="uploadURL"
          :show-file-list="false"
          :on-success="afterUpload"
          :headers="getAuthHeaders()"
        >
          <img style="width:auto" v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="战队描述">
        <el-input
          resize="none"
          type="textarea"
          :autosize="{ minRows: 3 }"
          v-model="model.description"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <ul class="teamer-list d-flex flex-wrap" style="padding:0">
          <li style='width:12.50%' v-for="item in playerList" :key='item._id' class="d-flex flex-1 flex-col ai-center">
            <img :src="item.icon" alt="">
            <span class="fs-xl">{{item.name}}</span>
          </li>
        </ul>
      </el-form-item>
      <el-form-item
        ><el-button type="primary" native-type="submit"
          >提交</el-button
        ><el-button type="warning" @click="back()"
          >返回</el-button
        ></el-form-item
      >
    </el-form>
  </div>
</template>

<script>
import "../assets/icons/iconfont.css";
import { createNewClub, getClubIdInfo, updateClub } from "@/api/admin/clubs.js";
import { getPlayerList } from "@/api/admin/players.js";
export default {
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      model: {},
      playerList:[]
    };
  },
  methods: {
    back(){
      this.$router.back()
    },
    // 提交
    async save() {
      if (this.id) {
        await updateClub(this.id, this.model);
      } else {
        await createNewClub(this.model);
      }
      this.$router.push("/clubs/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    // 是以编辑的路由跳转进来的就触发该fetch，绑定数据到model上
    async fetch() {
      const { data: res } = await getClubIdInfo(this.id);
      this.model = res;
      console.log(res);
    },
    afterUpload(res) {
      this.$set(this.model, "icon", res.url);
    },
    async initPlayerList() {
      const { data: res } = await getPlayerList();
  console.log(res);
      this.playerList=res.filter(ele=>{
        if(ele.club._id == this.id){
          return ele
        }
      })
    },
  },
  created() {
    // 获取到分类options的选项数据
    this.id && this.fetch() && this.initPlayerList();
  },
};
</script>

<style scoped>
li{
  list-style: none;
}
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
