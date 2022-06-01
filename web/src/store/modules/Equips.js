export default {
  state: {
    normal: [],
    epic: [],
    legend: [],
    myth: [],
    list: [],
  },
  mutations: {
    classify(state, data) {
      state.normal = [];
      state.epic = [];
      state.legend = [];
      state.myth = [];
      state.list = [];
      data.forEach((ele) => {
        switch (ele.level.name) {
          case "普通":
            state.normal.push(ele);
            break;
          case "史诗":
            state.epic.push(ele);
            break;
          case "传说":
            state.legend.push(ele);
            break;
          case "神话":
            state.myth.push(ele);
            break;
        }
        // 初始化词库
        state.list.push(ele.name);
      });
    },
    search(state, key) {
      let matches = state.list.filter((ele) => {
        return ele.split("").includes(key);
      });
      state.normal = state.normal.filter((ele) => {
        return matches.includes(ele.name);
      });
      state.epic = state.epic.filter((ele) => {
        return matches.includes(ele.name);
      });
      state.legend = state.legend.filter((ele) => {
        return matches.includes(ele.name);
      });
      state.myth = state.myth.filter((ele) => {
        return matches.includes(ele.name);
      });
    },
  },
  namespaced: true,
};
