<template>
  <div class="page-hero">
    <div class="page-hero-header">
      <div class="header px-4 bg-primary d-flex jc-between ai-center">
        <span @click="$router.back()" class="text-white">&lt; 返回上级 </span>
        <img
          src="../assets/images_files/logo-public.png"
          alt=""
          style="height: 30px"
        />
        <span class="text-white">更多英雄 &gt;</span>
      </div>
    </div>
    <!-- 基础信息 -->
    <div class="hero-detail p-3 text-white" style="background-color: #000">
      <div class="basic-info d-flex jc-between">
        <div class="flex-1 swiper swiper-skins">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="item in model.skins"
              :key="item._id"
            >
              <img style="width: 100%" :src="item.cover" alt="" />
              <div class="screen text-white fs-xl d-flex jc-center ai-center">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="info-right p-1 flex-1 d-flex flex-col jc-start">
          <strong class="fs-xxxl">{{ model.title }} </strong>
          <span class="fs-xxl">{{ model.name }}</span>
          <div class="tag">
            <span
              class="p-2 mr-2 text-white"
              v-for="tag in model.categories"
              :key="tag._id"
              >{{ tag.name }}</span
            >
          </div>

          <c-rating
            v-if="model.scores"
            title="难度"
            :rating="model.scores.difficult"
          ></c-rating>
          <c-rating
            v-if="model.scores"
            title="攻击"
            :rating="model.scores.attack"
          ></c-rating>
          <c-rating
            v-if="model.scores"
            title="技能"
            :rating="model.scores.skills"
          ></c-rating>
          <c-rating
            v-if="model.scores"
            title="生存"
            :rating="model.scores.survive"
          ></c-rating>
          <div class="position d-flex jc-around pt-2" style="margin: 0">
            <div
              v-if="model.positions.includes('上单')"
              class="sprite-position icon-top w-100"
            ></div>
            <div
              v-if="model.positions.includes('打野')"
              class="sprite-position icon-jug w-100"
            ></div>
            <div
              v-if="model.positions.includes('中路')"
              class="sprite-position icon-mid w-100"
            ></div>
            <div
              v-if="model.positions.includes('下路')"
              class="sprite-position icon-bot w-100"
            ></div>
            <div
              v-if="model.positions.includes('辅助')"
              class="sprite-position icon-sub w-100"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 导航 -->
    <div class="bg-white hero-nav p-3 pb-2 mt-3 d-flex jc-around">
      <div
        @click="changeSwiperActive(0)"
        class="pb-1 hero-nav-item"
        :class="active == 0 ? 'active' : ''"
      >
        基础介绍
      </div>
      <div
        @click="changeSwiperActive(1)"
        class="pb-1 hero-nav-item"
        :class="active == 1 ? 'active' : ''"
      >
        进阶攻略
      </div>
    </div>
    <div class="swiper swiper-hero" ref="list">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <!-- 技能 -->
          <c-card-com icon="jineng" title="技能描述">
            <div class="show-skills" v-if="model.skills.length != 0">
              <div class="m-3 skills-icon d-flex jc-around">
                <div
                  @click="selectIndex = index"
                  v-for="(item, index) in model.skills"
                  :key="item._id"
                >
                  <img
                    class="skill-border"
                    :class="selectIndex == index ? 'active-skill' : ''"
                    style="border-radius: 50%"
                    :src="item.icon"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div v-if="model.skills.length != 0" class="m-3 pt-2 skills-detail">
              <div class="d-flex jc-between">
                <img :src="model.skills[selectIndex].icon" alt="" />
                <div class="pl-3 desc flex-1 d-flex flex-col jc-between">
                  <span class="fs-xl">{{
                    model.skills[selectIndex].name
                  }}</span>
                  <span
                    >技能冷却：{{ model.skills[selectIndex].cooldown }}</span
                  >
                  <span>技能消耗：{{ model.skills[selectIndex].cost }}</span>
                </div>
              </div>
            </div>
            <div v-if="model.skills.length != 0" class="pt-2 px-3">
              {{ model.skills[selectIndex].description }}
            </div>
          </c-card-com>
          <!-- 顺风装备 -->
          <c-card-com v-if="model.items_adv" icon="jian" title="顺风出装">
            <div class="d-flex px-2">
              <img
                style="width: 12%"
                class="mr-2"
                v-for="item in model.items_adv"
                :key="item._id"
                :src="item.icon"
                :alt="item.name"
                @click="showEquip(item._id)"
              />
            </div>
          </c-card-com>
          <!-- 逆风装备 -->
          <c-card-com v-if="model.items_dis" icon="jian" title="逆风出装">
            <div class="d-flex px-2">
              <img
                style="width: 12%"
                class="mr-2"
                v-for="item in model.items_dis"
                :key="item._id"
                :src="item.icon"
                :alt="item.name"
                @click="showEquip(item._id)"
              />
            </div>
          </c-card-com>
          <!-- 搭档 -->
          <c-card-com v-if="model.partner" icon="hezuohuoban" title="最佳搭档">
            <div class="partner">
              <div
                class="d-flex jc-between mb-2"
                v-for="item in model.partner"
                :key="item._id"
              >
                <img style="width: 25%" :src="item.hero.icon" alt="" />
                <div class="p-2 flex-1 d-flex flex-col">
                  <router-link
                    class="text-dark-1 fs-xxl pb-3"
                    :to="`/heroes/${item.hero._id}`"
                    >{{ item.hero.title }} &gt;</router-link
                  >
                  <span>{{ item.description }}</span>
                </div>
              </div>
            </div>
          </c-card-com>
        </div>
        <div class="swiper-slide">
          <div class="bg-white my-3 py-3 fs-lg">
            <c-news-item
              v-if="relatedStrategy.length != 0"
              class="px-4"
              :news="relatedStrategy"
              :showTop="false"
            ></c-news-item>
            <div class="text-center" v-else>敬请期待该英雄攻略</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="equipsName" :visible.sync="dialogVisible" width="70%">
      <span>{{ equipsDesc }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { getHeroDetail } from "../api/plugins/News";
import { getEquipinfo } from "../api/plugins/Item";
import "../assets/icons/iconfont.css";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      active: 0,
      model: {
        scores: [],
        skills: [],
        positions: [],
      },
      selectIndex: 0,
      dialogVisible: false,
      equipsDesc: "",
      equipsName: "",
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      relatedStrategy: (state) => state.Articles.relatedStrategy,
    }),
  },
  methods: {
    ...mapActions("Articles", {
      getAllArticle: "getAllArticle",
    }),
    ...mapMutations("Articles", {
      initRelatedStrategy: "initRelatedStrategy",
    }),
    async initHeroInfo() {
      const { data: res } = await getHeroDetail(this.id);
      this.model = res;
    },
    changeSwiperActive(val) {
      this.$refs.list.swiper.slideTo(val);
    },
    async showEquip(val) {
      const { data: res } = await getEquipinfo(val);
      this.equipsDesc = res.description;
      this.equipsName = res.name;
      this.dialogVisible = true;
    },
  },
  watch: {
    id() {
      this.initHeroInfo();
    },
    "model.name"() {
      window.scrollTo(0, 0);
      // 延迟加载
      setTimeout(() => {
        this.initRelatedStrategy(this.model.name);
      }, 100);
    },
  },
  created() {
    this.initHeroInfo();

    // vuex
    this.getAllArticle();
  },
  mounted() {
    const swiperHero = new Swiper(".swiper-hero", {
      speed: 400,
      spaceBetween: 0,
    });
    swiperHero.on("slideChange", () => {
      this.active = this.$refs.list.swiper.activeIndex;
    });
    new Swiper(".swiper-skins", {
      speed: 400,
      spaceBetween: 50,
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.basic-info {
  img {
    width: 50%;
    height: auto;
  }
  .swiper {
    .swiper-wrapper {
      .swiper-slide {
        position: relative;
        .screen {
          width: 100%;
          height: 20%;
          position: absolute;
          bottom: 0;
          background: #000000; /* fallback for old browsers */
          background: -webkit-linear-gradient(
            to bottom,
            rgba(67, 67, 67, 0),
            #000000
          ); /* Chrome 10-25, Safari 5.1-6 */
          background: linear-gradient(
            to bottom,
            rgba(67, 67, 67, 0),
            #000000
          ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        }
      }
    }
  }
}
.info-right * {
  margin-bottom: 1.9231rem;
}
.info-right {
  .tag {
    span {
      background-color: map-get($map: $colors, $key: "primary");
      border-radius: 0.3846rem;
    }
  }
}
.hero-nav {
  .hero-nav-item {
    border-bottom: 2px solid transparent;
  }
  .active {
    color: map-get($map: $colors, $key: "primary");
    border-bottom: 2px solid map-get($map: $colors, $key: "primary");
  }
}
.show-skills {
  .skills-icon {
    .skill-border {
      border: 3px solid transparent;
    }
    .active-skill {
      border: 3px solid map-get($map: $colors, $key: "primary");
    }
  }
}
</style>
