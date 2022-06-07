import { getHeroList } from "@/api/plugins/News";
export default {
  state: {
    heroList: [],
    recomList: [],

    initId: "", // 用来初始化选中英雄攻略的状态值
  },
  mutations: {
    recomHeroList(state, val) {
      state.recomList = val
        .sort((a, b) => b.relatedStrategies.length - a.relatedStrategies.length)
        .splice(0, 6);
      state.initId = state.recomList[0]._id;
    },
    initHeroList(state, val) {
      state.heroList = val;
    },
  },
  actions: {
    async getHeroesList(context) {
      const { data: res } = await getHeroList();
      context.commit("recomHeroList", res);
      context.commit("initHeroList", res);
    },
  },
  namespaced: true,
};
