import axios from "axios";

const bashURL = axios.create({
  baseURL: process.env.VUE_APP_API_BASEURL || "/web/api",
});

// 导出接口
export { bashURL };
