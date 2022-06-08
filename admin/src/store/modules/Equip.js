import { getEquipList } from "@/api/admin/equips";
export default {
  state: {
    equipList: [
      {
        name: "普通",
        _id: 3428648941,
        list: [],
      },
      {
        name: "史诗",
        _id: 3428648942,
        list: [],
      },
      {
        name: "传说",
        _id: 3428648943,
        list: [],
      },
      {
        name: "神话",
        _id: 3428648944,
        list: [],
      },
    ],
  },
  mutations: {
    initEquipList(state, val) {
      // 初始化;
      state.equipList.forEach((ele) => {
        ele.list = [];
      });
      val.forEach((ele) => {
        switch (ele.level.name) {
          case "传说":
            state.equipList[2].list.push(ele);
            break;
          case "史诗":
            state.equipList[1].list.push(ele);
            break;
          case "神话":
            state.equipList[3].list.push(ele);
            break;
          case "普通":
            state.equipList[0].list.push(ele);
            break;
        }
      });
    },
  },
  actions: {
    async getEquipList(context) {
      const { data: res } = await getEquipList();
      context.commit("initEquipList", res);
    },
  },
  namespaced: true,
};
