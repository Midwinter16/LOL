<template>
  <div class="login-content">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
        <el-button type="primary" native-type="submit">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getAdminList } from "@/api/admin/login.js";
export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async login() {
      const { data: res } = await getAdminList(this.model);
      localStorage.setItem("token", res);
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登录成功",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-card {
  margin: 6rem auto;
  width: 25rem;
}
</style>
