<template>
  <div class="about">
    <el-form @submit.native.prevent="save" label-width="120px">
      <h1>{{ id ? "编辑" : "新增" }}职业选手</h1>
      <el-form-item label="头像" class="upload">
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

      <el-form-item style="width: 400px" label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item style="width: 400px" label="位置">
        <el-select v-model="model.position">
          <el-option
            v-for="item in positions"
            :key="item._id"
            :value="item.name"
            :label="item.name"
            >{{ item.name }}</el-option
          >
        </el-select>
      </el-form-item>

      <el-form-item label="擅长英雄">
        <el-select
          style="width: 400px"
          filterable
          multiple
          :multiple-limit="3"
          v-model="model.adept"
        >
          <el-option
            v-for="item in heroList"
            :key="item._id"
            :value="item._id"
            :label="item.name"
            >{{ item.name }}</el-option
          >
        </el-select>
      </el-form-item>

      <el-form-item label="介绍">
        <el-input
          resize="none"
          type="textarea"
          :autosize="{ minRows: 3 }"
          v-model="model.description"
        ></el-input>
      </el-form-item>

      <el-form-item style="width: 400px" label="编号">
        <el-input v-model="model.number"></el-input>
      </el-form-item>

      <el-form-item style="width: 400px" label="所属战队">
        <el-select v-model="model.club">
        <el-option
            value="未入队"
            label="未入队"
            >未入队</el-option
          >
          <el-option
            v-for="item in clubList"
            :key="item._id"
            :value="item._id"
            :label="item.name"
            >{{ item.name }}</el-option
          >
        </el-select>
      </el-form-item>

      <el-form-item style="width: 400px" label="目前状态">
        <el-select v-model="model.status">
          <el-option
            v-for="item in status"
            :key="item._id"
            :value="item.name"
            :label="item.name"
            >{{ item.name }}</el-option
          >
        </el-select>
      </el-form-item>

      <el-form-item v-if="model.status === '强制退役'" label="强制退役原因">
        <el-input
          resize="none"
          type="textarea"
          :autosize="{ minRows: 3 }"
          v-model="model.special"
        ></el-input>
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
import { getHeroList } from "@/api/admin/heroes.js";
import { getClubList,getClubIdInfo,updateClub } from "@/api/admin/clubs.js";
import {
  getPlayerList,
  createNewPlayer,
  updatePlayer,
  getPlayerIdInfo
} from "@/api/admin/players.js";
export default {
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      model: {
        status: "",
        number: "",
        club: "",
      },
      club_id:'',
      clubList: [],
      heroList: {},
      positions: [
        {
          _id: 3943441,
          name: "上路",
        },
        {
          _id: 3943442,
          name: "打野",
        },
        {
          _id: 3943443,
          name: "中路",
        },
        {
          _id: 3943444,
          name: "下路",
        },
        {
          _id: 3943445,
          name: "辅助",
        },
      ],
      status: [
        {
          _id: 3428642841,
          name: "待入队",
        },
        {
          _id: 3428642842,
          name: "在役",
        },
        {
          _id: 3428642843,
          name: "退役",
        },
        {
          _id: 3428642844,
          name: "强制退役",
        },
      ],
    };
  },
  methods: {
    back(){
      this.$router.back()
    },
    // 提交
    async save() {
      if (this.id) {
        await updatePlayer(this.id, this.model);
      } else {
        await createNewPlayer(this.model);
      }

      this.$router.push("/players/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    // 是以编辑的路由跳转进来的就触发该fetch，绑定数据到model上
    async fetch() {
      const { data: res } = await getPlayerIdInfo(this.id);
      this.model = res;
    },
    async initHeroesList() {
      const { data: res } = await getHeroList();
      this.heroList = res;
    },
    async initClubsList() {
      const { data: res } = await getClubList();
      this.clubList = res;
    },
    async initPlayerNumber() {
      const { data: res } = await getPlayerList();
      let num = res.length + 1;
      let len = 5 - num.toString().length;
      let zeros = "0";
      for (let i = 1; i < len; i++) {
        zeros += "0";
      }
      this.model.number = zeros + num.toString();
    },
    afterUpload(res) {
      this.$set(this.model, "icon", res.url);
    },
  },
  watch: {
    'model.club':{
      deep:true,
      handler(val){
        if(val === '未入队'){
          this.model.status = '待入队'
        }else if(val != ''){
          this.model.status = '在役'
        }
      }
    },
  },
  created() {
    // 获取到分类options的选项数据
    this.id && this.fetch();
    // 获取到分类的符文种类
    this.initHeroesList();
    this.initPlayerNumber();
    this.initClubsList();
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
