import { getAllArticle, getNewsList } from "@/api/plugins/Strategy";

export default {
  state: {
    allArticle: [],
    classAllArticle: [],
    allStrategies: [],
    hots: [],
    relatedStrategy: [],
  },
  mutations: {
    initAllArticle(state, val) {
      state.allArticle = val.res1
        .map((ele) => {
          ele.createdAt = Date.parse(ele.createdAt);
          return ele;
        })
        .sort((a, b) => b.createdAt - a.createdAt);
      // 攻略中心，包括筛选出攻略和置顶提前
      let temp = val.res1.filter((ele) => ele.categories[0].name === "攻略");
      let top = temp.filter((ele) => ele.topStatus);
      let untop = temp.filter((ele) => !ele.topStatus);
      state.allStrategies = [...top, ...untop];
      // 热点资讯，包括阅读量按照从大到小排序
      state.hots = temp.sort((a, b) => b.clicks - a.clicks).splice(0, 4);
      // 带分类的新闻资讯
      state.classAllArticle = val.res2;
    },
    initRelatedStrategy(state, val) {
      state.relatedStrategy = state.allStrategies.filter(
        (ele) => ele.relatedHero.name === val
      );
    },
  },
  actions: {
    async getAllArticle(context) {
      const { data: res1 } = await getAllArticle();

      const { data: res2 } = await getNewsList();

      context.commit("initAllArticle", { res1, res2 });
    },
  },
  namespaced: true,
};
