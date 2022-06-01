<template>
  <div class="about">
    <el-form @submit.native.prevent="save" label-width="120px">
      <h1>{{ id ? "编辑" : "新建" }}皮肤</h1>
      <el-form-item label="皮肤名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="皮肤品级">
        <el-select v-model="model.level" placeholder="请选择皮肤品级">
          <el-option
            v-for="item in skinLevel"
            :key="item._id"
            :value="item._id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属英雄">
        <el-select
          filterable
          v-model="model.owner"
          placeholder="请选择所属英雄"
        >
          <el-option
            v-for="item in heroes"
            :key="item._id"
            :value="item._id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格">
        <el-input style="width: 120px" v-model="model.price"></el-input>
      </el-form-item>
      <el-form-item label="封面" class="upload">
        <el-upload
          class="avatar-uploader"
          :headers="getAuthHeaders()"
          :action="uploadURL"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <!-- afterUpload指的是在上传完毕之后触发的方法 -->
          <!-- action是指上传的地址 -->
          <img
            style="height: auto"
            v-if="model.cover"
            :src="model.cover"
            class="avatar"
          />
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
import { getCategoryList } from "@/api/admin/categories.js";
import { updateHero, getHeroList, getHeroIdInfo } from "@/api/admin/heroes.js";
import { updateSkin, createNewSkin, getSkinIdInfo } from "@/api/admin/skins.js";
export default {
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      model: {},
      skinLevel: [],
      heroes: [],
    };
  },
  methods: {
    async save() {
      if (!this.model.cover) {
        this.$message({
          type: "warning",
          message: "请选择封面",
        });
        return;
      }
      if (this.id) {
        await updateSkin(this.id, this.model);
      } else {
        let { data: newid } = await createNewSkin(this.model);
        // 添加皮肤的同时将皮肤添加到英雄信息下面，前提是有该英雄存在在数据库
        const { data: res } = await getHeroIdInfo(this.model.owner);
        res.skins.includes(newid._id) ? res.skins : res.skins.push(newid._id);
        await updateHero(this.model.owner, res);
      }
      this.$router.push("/skins/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async initSkinList() {
      const { data: res } = await getCategoryList();
      let prepro = res.filter((ele) => {
        if (ele.parent) {
          return ele.parent.name === "皮肤品级";
        }
      });
      this.skinLevel = prepro;
    },
    async initHeroList() {
      const { data: res } = await getHeroList();
      this.heroes = res;
    },
    afterUpload(res) {
      this.$set(this.model, "cover", res.url);
    },
    async fetch() {
      const { data: res } = await getSkinIdInfo(this.id);
      console.log(res);
      this.model = res;
    },
  },
  created() {
    this.id && this.fetch();
    this.initSkinList();
    this.initHeroList();
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
