<template>
  <div>
    <el-table :data="list">
      <el-table-column
        show-overflow-tooltip
        prop="_id"
        label="ID"
        width="120px"
      ></el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/admin_users/edit/${scope.row._id}`)"
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
import { getAdminList, deleteListId } from "@/api/admin/admins.js";
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    async fetch() {
      const { data: res } = await getAdminList("");
      this.list = res;
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
