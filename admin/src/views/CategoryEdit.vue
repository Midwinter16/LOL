<template>
  <div class="about">
    <el-form @submit.native.prevent="save" label-width="120px">
      <h1>{{ id ? "编辑分类" : "新建分类" }}</h1>
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" placeholder="请选择，不选为顶级分类">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="名字">
        <el-input v-model="model.name"></el-input>
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
  getParentsInfo,
} from "@/api/admin/categories.js";
export default {
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      model: {},
      parents: [],
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
      this.$router.push("/categories/list");
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
    // 将所有的分类放置在页面的上级分类中
    async fetchParents() {
      const { data: res } = await getParentsInfo();
      this.parents = res.filter((ele) => {
        return !ele.parent;
      });
    },
  },
  created() {
    // 如果有ID这个值，那么是edit页面，触发fetch，否则就是认定为create页面
    this.id && this.fetch();
    // 获取到分类options的选项数据
    this.fetchParents();
  },
};
</script>

<style></style>
