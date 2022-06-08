import { getHeroList, getHeroesList } from "@/api/plugins/News";
export default {
  state: {
    classHeroList: [],
    heroList: [],
    recomList: [],

    initId: "", // 用来初始化选中英雄攻略的状态值
  },
  mutations: {
    initHeroList(state, val) {
      state.recomList = val.res1
        .sort((a, b) => b.relatedStrategies.length - a.relatedStrategies.length)
        .splice(0, 6);
      state.initId = state.recomList[0]._id;
      // 初始化所有英雄列表
      state.heroList = val.res1;
      // 初始化带职责分类的所有英雄列表
      state.classHeroList = val.res2;
    },
  },
  actions: {
    async getHeroesList(context) {
      const { data: res1 } = await getHeroList(); // 不带分类
      const { data: res2 } = await getHeroesList(); // 带分类
      context.commit("initHeroList", { res1, res2 });
    },
  },
  namespaced: true,
};
