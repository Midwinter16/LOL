import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import Equips from "./modules/Equips";
import Runes from "./modules/Runes";

let store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    Equips,
    Runes,
  },
});

export default store;
