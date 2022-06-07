import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import Player from "./modules/Player";
import Hero from "./modules/Hero";
import Match from "./modules/Match";
import Equip from "./modules/Equip";

export default new Vuex.Store({
  modules: {
    Player,
    Hero,
    Match,
    Equip,
  },
});
