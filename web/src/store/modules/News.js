import { getAdsList } from "@/api/plugins/News";
export default {
  state: { adsList: [] },
  mutations: {
    initAdsList(state, val) {
      state.adsList = val
        .sort((a, b) => parseInt(b.date) - parseInt(a.date))
        .splice(0, 5);
    },
  },
  actions: {
    async getAdsList(context) {
      const { data: res } = await getAdsList();
      context.commit("initAdsList", res);
    },
  },
  namespaced: true,
};
