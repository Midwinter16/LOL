<template>
  <div class="about">
    <el-form @submit.native.prevent="save" label-width="120px">
      <h1>{{ id ? "编辑" : "新建" }}比赛</h1>
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
export default {
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {};
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
      await updateSkin(this.id, this.model);
      this.$router.push("/skins/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const { data: res } = await getSkinIdInfo(this.id);
      console.log(res);
      this.model = res;
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>

<style scoped></style>
