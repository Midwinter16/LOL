<template>
  <div>
    <el-table
      :default-sort="{ prop: 'date', order: 'descending' }"
      :data="list"
    >
      <el-table-column
        show-overflow-tooltip
        prop="_id"
        label="ID"
        width="120px"
      ></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column
        sortable
        prop="category.name"
        label="种类"
      ></el-table-column>
      <el-table-column sortable prop="level" label="等级"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="height: 3rem" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/runes/edit/${scope.row._id}`)"
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
import { getRuneList, deleteListId } from "@/api/admin/runes.js";
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    async fetch() {
      const { data: res } = await getRuneList("");
      this.list = res;
    },
    async deleteItem(row) {
      this.$confirm(`是否删除"${row.name}"符文`, "提示", {
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

<style>
.ellipsis {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
