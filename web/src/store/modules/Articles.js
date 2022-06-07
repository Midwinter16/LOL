import { getAllArticle } from "@/api/plugins/Strategy";
export default {
  state: {
    allArticle: [],
    allStrategies: [],
    hots: [],
  },
  mutations: {
    initAllArticle(state, val) {
      state.allArticle = val;
      // 攻略中心，包括筛选出攻略和置顶提前
      let temp = val.filter((ele) => ele.categories[0].name === "攻略");
      let top = temp.filter((ele) => ele.topStatus);
      let untop = temp.filter((ele) => !ele.topStatus);
      state.allStrategies = [...top, ...untop];
      // 热点资讯，包括阅读量按照从大到小排序
      state.hots = temp.sort((a, b) => b.clicks - a.clicks).splice(0, 4);
    },
  },
  actions: {
    async getAllArticle(context) {
      const { data: res } = await getAllArticle();
      context.commit("initAllArticle", res);
    },
  },
  namespaced: true,
};
