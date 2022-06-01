<template>
  <div class="about">
    <el-form @submit.native.prevent="save" label-width="120px">
      <h1>{{ id ? "编辑" : "新建" }}文章</h1>
      <el-form-item label="所属分类">
        <el-select
          style="width: 360px"
          multiple
          v-model="model.categories"
          placeholder="请选择"
        >
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="isStrategy" label="相关英雄">
        <el-select
          filterable
          v-model="model.relatedHero"
          placeholder="请选择相关英雄"
        >
          <el-option
            v-for="item in heroList"
            :key="item._id"
            :value="item._id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="model.author"></el-input>
      </el-form-item>
      <el-form-item label="置顶状态">
        <el-select
          style="width: 200px"
          v-model="model.topStatus"
          placeholder="选择是否置顶"
        >
          <el-option
            v-for="(item, index) in topStatus"
            :key="index"
            :value="item.status"
            :label="item.title"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阅读量">
        <el-input
          style="width: 200px"
          v-model="model.clicks"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="封面" class="upload">
        <el-upload
          class="avatar-uploader"
          :action="uploadURL"
          :show-file-list="false"
          :on-success="afterUpload"
          :headers="getAuthHeaders()"
        >
          <img v-if="model.cover" :src="model.cover" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor
          id="editor"
          useCustomImageHandler
          @image-added="handleImageAdded"
          v-model="model.body"
        >
        </vue-editor>
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
} from "@/api/admin/articles.js";
import { getCategoryList } from "@/api/admin/categories.js";
import { updateHero, getHeroList, getHeroIdInfo } from "@/api/admin/heroes.js";
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      model: {
        clicks: 0,
      },
      categories: [],
      topStatus: [
        {
          status: true,
          title: "置顶",
        },
        {
          status: false,
          title: "不置顶",
        },
      ],
      heroList: [],
    };
  },
  methods: {
    // 提交
    async save() {
      if (this.id) {
        await updateList(this.id, this.model);
      } else {
        let { data: newid } = await createNewList(this.model);
        // 添加相关攻略的同时将相关攻略添加到英雄信息下面，前提是有该英雄存在在数据库，并且分类是攻略
        if (this.isStrategy) {
          const { data: res } = await getHeroIdInfo(this.model.relatedHero);
          res.relatedStrategies.includes(newid._id)
            ? res.relatedStrategies
            : res.relatedStrategies.push(newid._id);
          await updateHero(this.model.relatedHero, res);
        }
      }
      this.$router.push("/articles/list");
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
    // 将所有的分类放置在页面的上级分类中
    async fetchCategories() {
      const { data: res } = await getCategoryList();
      let prepro = res.filter((ele) => {
        if (ele.parent) {
          return ele.parent.name == "新闻分类";
        }
      });
      this.categories = prepro;
    },
    // 组件方法
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);
      const { data: res } = await this.$http.post(
        this.$http.defaults.baseURL + "upload",
        formData
      );
      Editor.insertEmbed(cursorLocation, "image", res.url);
      resetUploader();
    },
    afterUpload(res) {
      this.$set(this.model, "cover", res.url);
    },
    // 获取英雄列表
    async getHeroList() {
      const { data: res } = await getHeroList();
      this.heroList = res;
    },
  },
  computed: {
    isStrategy() {
      if (this.model.categories) {
        // 暂时使用了攻略的ID
        return this.model.categories.includes("627498cfe8810660e4c7cb46");
      }
    },
  },
  created() {
    // 如果有ID这个值，那么是edit页面，触发fetch，否则就是认定为create页面
    this.id && this.fetch();
    // 获取到分类options的选项数据
    this.fetchCategories();
    // 获取英雄分类
    this.getHeroList();
  },
  components: {
    VueEditor,
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
  width: 100%;
  height: 178px;
  display: block;
}
</style>
