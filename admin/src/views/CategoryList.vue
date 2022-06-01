<template>
  <div>
    <el-table
      v-if="isListReady"
      :data="list"
      :default-sort="{ prop: 'date', order: 'ascending' }"
    >
      <el-table-column
        show-overflow-tooltip
        prop="_id"
        label="ID"
        width="120px"
      ></el-table-column>
      <el-table-column
        sortable
        prop="parent.name"
        label="上级分类"
      ></el-table-column>
      <el-table-column prop="name" label="分类"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/categories/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            native-type="submit"
            @click="deleteItem(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCategoryList, deleteListId } from "@/api/admin/categories.js";
export default {
  data() {
    return {
      list: [],
      isListReady: false,
    };
  },
  methods: {
    async fetch() {
      const { data: res } = await getCategoryList("");
      // 为顶级分类添加名字
      let prepro = res.map((ele) => {
        if (!ele.parent) {
          ele.parent = {};
          ele.parent.name = "顶级分类";
        }
        return ele;
      });
      this.list = prepro;
      this.isListReady = true;
    },
    async deleteItem(row) {
      this.$confirm(`是否删除此分支"${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await deleteListId(row._id);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.fetch();
      });
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style></style>
