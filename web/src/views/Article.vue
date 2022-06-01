<template>
  <div class="page-article bg-white">
    <div class="header px-2 bg-primary d-flex jc-around ai-center">
      <div class="title text-white">银龙重铸之日</div>
      <img
        src="../assets/images_files/logo-public.png"
        alt=""
        style="height: 30px"
      />
      <div class="title text-white">骑士归来之时</div>
    </div>
    <div class="border-bottom page-header py-3 mx-3 d-flex js-between">
      <i @click="$router.back()" class="iconfont icon-youjiantou"></i>
      <strong class="flex-1 mx-2"> {{ model.title }} </strong>
      <span>{{ model.createAt | date }}</span>
    </div>
    <div class="page-body m-3" v-html="model.body"></div>
    <div class="related-info border-top mx-3 py-3 d-flex ai-center">
      <i class="text-dark-1 iconfont icon-zixun"></i>
      <span class="ml-2 text-dark-1">相关资讯</span>
    </div>
    <router-link
      tag="div"
      class="mx-3 pb-2 cp"
      :to="item._id"
      v-for="item in model.related"
      :key="item._id"
      >{{ item.title }}</router-link
    >
  </div>
</template>

<script>
import { getArticleDetail } from "../api/plugins/News";
import "../assets/icons/iconfont.css";
import dayjs from "dayjs";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      model: {},
    };
  },
  filters: {
    date(val) {
      return dayjs(val).format("YYYY/MM/DD");
    },
  },
  methods: {
    async articleDetail() {
      const { data: res } = await getArticleDetail(this.id);
      this.model = res;
    },
  },
  created() {
    this.articleDetail();
  },
  watch: {
    id: "articleDetail",
    // 上面这种写法是缩写，扩写为
    // id(){
    //   this.articleDetail()
    // }
  },
};
</script>

<style lang="scss">
.page-body {
  img {
    width: 100%;
    height: auto;
  }
  p {
    line-height: 2rem;
  }
}
</style>
