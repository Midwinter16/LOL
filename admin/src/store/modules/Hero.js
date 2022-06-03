import { getHeroList } from "@/api/admin/heroes";
export default {
  state: {
    heroList: [],
  },
  mutations: {
    initHeroList(state, val) {
      state.heroList = val;
    },
  },
  actions: {
    async getHeroList(context) {
      const { data: res } = await getHeroList();
      context.commit("initHeroList", res);
    },
  },
  namespaced: true,
};
