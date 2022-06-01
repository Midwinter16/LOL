import { getPlayerList } from "@/api/admin/players";
export default {
  state: {
    allPlayers: [],
    judgeFirst: {},
    bluePlayersTop: [],
    bluePlayersJug: [],
    bluePlayersMid: [],
    bluePlayersBot: [],
    bluePlayersSub: [],
    redPlayersTop: [],
    redPlayersJug: [],
    redPlayersMid: [],
    redPlayersBot: [],
    redPlayersSub: [],
    redPlayers: [],
  },
  mutations: {
    // 根据战队筛选
    filterByClub(state, clubId) {
      state.filterPlayers = state.allPlayers.filter(
        (ele) => ele.club._id === clubId
      );
    },
    // 根据蓝色方战队筛选
    filterByBlue(state, clubId) {
      let temp = state.allPlayers.filter((ele) => ele.club._id === clubId);
      state.bluePlayersTop = temp.filter((ele) => ele.position == "top");
      state.bluePlayersJug = temp.filter((ele) => ele.position == "jug");
      state.bluePlayersMid = temp.filter((ele) => ele.position == "mid");
      state.bluePlayersBot = temp.filter((ele) => ele.position == "bot");
      state.bluePlayersSub = temp.filter((ele) => ele.position == "sub");
    },
    // 根据红色方战队筛选
    filterByRed(state, clubId) {
      let temp = state.allPlayers.filter((ele) => ele.club._id === clubId);
      state.redPlayersTop = temp.filter((ele) => ele.position == "top");
      state.redPlayersJug = temp.filter((ele) => ele.position == "jug");
      state.redPlayersMid = temp.filter((ele) => ele.position == "mid");
      state.redPlayersBot = temp.filter((ele) => ele.position == "bot");
      state.redPlayersSub = temp.filter((ele) => ele.position == "sub");
    },
    initAllPlayers(state, val) {
      state.allPlayers = val;
    },
    reset(state, val) {
      state.allPlayers = [];
      state.bluePlayersTop = [];
      state.bluePlayersJug = [];
      state.bluePlayersMid = [];
      state.bluePlayersBot = [];
      state.bluePlayersSub = [];
      state.redPlayersTop = [];
      state.redPlayersJug = [];
      state.redPlayersMid = [];
      state.redPlayersBot = [];
      state.redPlayersSub = [];
      state.filterPlayers = [];
    },
    // filterByFirst(state) {},
  },
  actions: {
    async getAllPlayers(context) {
      context.commit("reset");
      const { data: res } = await getPlayerList();
      context.commit("initAllPlayers", res);
    },
  },
  namespaced: true,
};
