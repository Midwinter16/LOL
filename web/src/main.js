import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import "./assets/scss/style.scss";

import Card from "@/components/Card";
Vue.component("c-card", Card);
import CardList from "@/components/CardList";
Vue.component("c-card-list", CardList);
import Nav from "@/components/Nav.vue";
Vue.component("c-nav", Nav);
import Header from "@/components/Header.vue";
Vue.component("c-header", Header);
import NewsItem from "@/components/NewsItem.vue";
Vue.component("c-news-item", NewsItem);
import Card2 from "@/components/Card2.vue";
Vue.component("c-card-2", Card2);
import CountTime from "@/components/CountTime";
Vue.component("c-time", CountTime);

import { Dialog, Button, Input } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Input);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
