import axios from "axios";
import Vue from "vue";
import router from "../router/index";

const bashURL = axios.create({
  // 判断是否是生产环境，如果是则将主机设置为process.env.VUE_APP_API_URL，否则是http://localhost:3000
  baseURL: process.env.VUE_APP_API_BASEURL || "/admin/api",
  // baseURL: "http://localhost:3000/admin/api/",
});
// 设置验证用户的拦截器
bashURL.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.data.message) {
      Vue.prototype.$message({
        type: "error",
        message: err.response.data.message,
      });
    }
  }
);

const admin_request = axios.create({
  baseURL: process.env.VUE_APP_API_RESTURL || "/admin/api/rest",
  // baseURL: "http://localhost:3000/admin/api/rest",
});
// 设置传输数据的拦截器;
admin_request.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers.Authorization =
        "Bearer " + (localStorage.getItem("token") || "");
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
admin_request.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.data.message) {
      Vue.prototype.$message({
        type: "error",
        message: err.response.data.message,
      });
    }
    // 如果为401跳转到登录页
    if (err.response.status == 401) {
      router.push("/login");
    }
  }
);

// 导出接口
export { admin_request, bashURL };
