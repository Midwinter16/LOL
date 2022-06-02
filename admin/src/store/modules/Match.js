import { getMatchList, updateMatch, getMatchIdInfo } from "@/api/admin/matches";
export default {
  state: {
    match: {},
    matchId: "",
    matchingList: [],
    matchedList: [],
    matchOverList: [],
    isOver: 0,
  },
  mutations: {
    initMatchingList(state, val) {
      // 筛选出进行中的比赛
      state.matchingList = val
        .filter((ele) => !ele.over)
        .filter((ele) => ele.start != "0");
    },
    initMatchedList(state, val) {
      // 筛选出未完成的比赛
      state.matchedList = val
        .filter((ele) => !ele.over)
        .filter((ele) => ele.start == "0");
    },
    initMatchOverList(state, val) {
      // 筛选出结束的比赛
      state.matchOverList = val.filter((ele) => ele.over);
    },
    initMatch(state, obj) {
      state.match = obj.res;
      state.matchId = obj.id;
    },
    // 更新比赛状态
    update(state, val) {
      let isOver = false;
      if (val == "start") {
        state.match.start = Date.parse(new Date());
        updateMatch(state.matchId, state.match);
        return;
      } else if (val == "red") {
        state.match.red.score += 1;
        // 如果到了胜利场数就设置over为true
        if (state.match.red.score == state.match.WINnum) {
          state.match.over = true;
          // 设置整个赛制结束时间
          state.match.end = Date.parse(new Date());
          state.match.winer = "red";
          isOver = true;
        } else {
          state.match.start = "0";
        }
      } else {
        state.match.blue.score += 1;
        if (state.match.blue.score == state.match.WINnum) {
          state.match.over = true;
          state.match.end = Date.parse(new Date());
          state.match.winer = "blue";
          isOver = true;
        } else {
          state.match.start = "0";
        }
      }
      updateMatch(state.matchId, state.match);
      isOver ? (state.isOver = 1) : (state.isOver = 0);
    },
  },
  actions: {
    async getMatchList(context) {
      const { data: res } = await getMatchList();
      context.commit("initMatchingList", res);
      context.commit("initMatchedList", res);
      context.commit("initMatchOverList", res);
    },
    async getMatchIdInfo(context, id) {
      const { data: res } = await getMatchIdInfo(id);
      context.commit("initMatch", {
        res: res,
        id: id,
      });
    },
  },
  namespaced: true,
};
