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
        prop="position"
        label="位置"
      ></el-table-column>
      
      <el-table-column sortable prop="club.name" label="战队"></el-table-column>
      
      <el-table-column
        sortable
        prop="status"
        label="状态"
      ></el-table-column>
      <el-table-column prop="icon" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="height: 3rem" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/players/edit/${scope.row._id}`)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getPlayerList } from "@/api/admin/players.js";
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    async fetch() {
      const { data: res } = await getPlayerList("");
      this.list = res;
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
