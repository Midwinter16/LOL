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
    <div class="bg-white hero-detail p-3">
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
        <div class="info-right p-2 flex-1 d-flex flex-col jc-start">
          <strong class="fs-xxxl">{{ model.title }}</strong>
          <span class="fs-xxl">{{ model.name }}</span>
          <Rating
            v-if="model.scores"
            title="难度"
            :rating="model.scores.difficult"
          ></Rating>
          <Rating
            v-if="model.scores"
            title="攻击"
            :rating="model.scores.attack"
          ></Rating>
          <Rating
            v-if="model.scores"
            title="技能"
            :rating="model.scores.skills"
          ></Rating>
          <Rating
            v-if="model.scores"
            title="生存"
            :rating="model.scores.survive"
          ></Rating>
          <div class="tag">
            <span
              class="p-2 mr-2 text-white"
              v-for="tag in model.categories"
              :key="tag._id"
              >{{ tag.name }}</span
            >
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
          <CardCom icon="jineng" title="技能描述">
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
          </CardCom>
          <!-- 顺风装备 -->
          <CardCom v-if="model.items_adv" icon="jian" title="顺风出装">
            <div class="d-flex px-2">
              <img
                style="width: 12%"
                class="mr-2"
                v-for="item in model.items_adv"
                :key="item._id"
                :src="item.icon"
                :alt="item.name"
              />
            </div>
          </CardCom>
          <!-- 逆风装备 -->
          <CardCom v-if="model.items_dis" icon="jian" title="逆风出装">
            <div class="d-flex px-2">
              <img
                style="width: 12%"
                class="mr-2"
                v-for="item in model.items_dis"
                :key="item._id"
                :src="item.icon"
                :alt="item.name"
              />
            </div>
          </CardCom>
          <!-- 搭档 -->
          <CardCom v-if="model.partner" icon="hezuohuoban" title="最佳搭档">
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
          </CardCom>
        </div>
        <div class="swiper-slide">
          <div class="m-5 p-5 fs-xxxl">敬请期待</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { getHeroDetail } from "../api/plugins/News";
import Rating from "@/components/Rating";
import "../assets/icons/iconfont.css";
import CardCom from "@/components/CardCom";
import Card from "@/components/Card.vue";

export default {
  data() {
    return {
      active: 0,
      model: {
        scores: [],
        skills: [],
      },
      selectIndex: 0,
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    async initHeroInfo() {
      const { data: res } = await getHeroDetail(this.id);
      console.log(res);
      this.model = res;
    },
    changeSwiperActive(val) {
      this.$refs.list.swiper.slideTo(val);
    },
  },
  watch: {
    id() {
      this.initHeroInfo();
    },
  },
  created() {
    this.initHeroInfo();
  },
  components: {
    Rating,
    CardCom,
    Card,
  },
  mounted() {
    const swiperHero = new Swiper(".swiper-hero", {
      speed: 400,
      spaceBetween: 0,
    });
    swiperHero.on("slideChange", () => {
      this.active = this.$refs.list.swiper.activeIndex;
    });
    const swiperSkin = new Swiper(".swiper-skins", {
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
