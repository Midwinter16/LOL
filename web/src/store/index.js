import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import Equips from "./modules/Equips";
import Runes from "./modules/Runes";
import Matches from "./modules/Matches";
import News from "./modules/News";
import Heroes from "./modules/Heroes";
import Articles from "./modules/Articles";

let store = new Vuex.Store({
  modules: {
    Equips,
    Runes,
    Matches,
    News,
    Heroes,
    Articles,
  },
});

export default store;
