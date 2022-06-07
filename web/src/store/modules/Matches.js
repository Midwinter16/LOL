import { getMatchList } from "@/api/plugins/Match";

export default {
  state: {
    matchList: {},
    matchingList: {},
    matchedList: {},
    overList: {},
  },
  mutations: {
    initMatchList(state, val) {
      state.matchList = val;
      state.matchingList = state.matchList
        .filter((ele) => !ele.over)
        .filter((ele) => ele.start != "0");
      state.matchedList = state.matchList
        .filter((ele) => !ele.over)
        .filter((ele) => ele.start == "0");
      state.overList = state.matchList.filter((ele) => ele.over);
    },
  },
  actions: {
    async getMatchList(context) {
      const { data: res } = await getMatchList();
      context.commit("initMatchList", res);
    },
  },
  namespaced: true,
};
