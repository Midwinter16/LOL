<template>
  <div>
    <el-table
      :data="list"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column
        show-overflow-tooltip
        prop="_id"
        label="ID"
        width="120px"
      ></el-table-column>
      <el-table-column prop="date" label="日期" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="名字"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/ads/edit/${scope.row._id}`)"
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
import { getAdsList, deleteListId } from "@/api/admin/ads.js";
import dayjs from "dayjs";
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    format(val) {
      return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
    },
    async fetch() {
      const { data: res } = await getAdsList("");
      this.list = res;
    },
    async deleteItem(row) {
      this.$confirm(`是否删除此广告"${row.name}"`, "提示", {
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
