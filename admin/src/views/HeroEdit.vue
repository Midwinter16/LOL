<template>
  <div class="about">
    <el-form label-width="120px" @submit.native.prevent="save">
      <h1>{{ id ? "编辑" : "新建" }}英雄</h1>

      <el-tabs type="border-card">
        <!-- 基础信息 -->
        <el-tab-pane label="基础信息">
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="图标" class="upload">
            <el-upload
              class="avatar-uploader"
              :headers="getAuthHeaders()"
              :action="uploadURL"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <!-- afterUpload指的是在上传完毕之后触发的方法 -->
              <!-- action是指上传的地址 -->
              <img v-if="model.icon" :src="model.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select multiple v-model="model.categories">
              <el-option
                :label="item.name"
                :value="item._id"
                v-for="item in categories"
                :key="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="位置">
            <el-select multiple v-model="model.positions">
              <el-option
                :label="item.name"
                :value="item.name"
                v-for="item in positions"
                :key="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              show-score
              style="margin-top: 0.6rem"
              :max="5"
              v-model="model.scores.difficult"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              show-score
              style="margin-top: 0.6rem"
              :max="5"
              v-model="model.scores.attack"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              show-score
              style="margin-top: 0.6rem"
              :max="5"
              v-model="model.scores.skills"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              show-score
              style="margin-top: 0.6rem"
              :max="5"
              v-model="model.scores.survive"
            ></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select
              style="width: 600px"
              multiple
              :multiple-limit="6"
              v-model="model.items_adv"
            >
              <el-option-group
                v-for="group in equipList"
                :key="group._id"
                :label="group.name"
              >
                <el-option
                  :label="item.name"
                  :value="item._id"
                  v-for="(item, index) in group.list"
                  :key="item._id + index"
                >
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select
              style="width: 600px"
              multiple
              :multiple-limit="6"
              v-model="model.items_dis"
            >
              <el-option-group
                v-for="group in equipList"
                :key="group._id"
                :label="group.name"
              >
                <el-option
                  :label="item.name"
                  :value="item._id"
                  v-for="(item, index) in group.list"
                  :key="item._id + index"
                >
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>

          <el-form-item label="使用技巧">
            <el-input
              resize="none"
              type="textarea"
              :autosize="{ minRows: 2 }"
              v-model="model.usageTips"
            ></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input
              resize="none"
              type="textarea"
              :autosize="{ minRows: 2 }"
              v-model="model.battleTips"
            ></el-input>
          </el-form-item>
          <el-form-item label="团战技巧">
            <el-input
              resize="none"
              type="textarea"
              :autosize="{ minRows: 2 }"
              v-model="model.teamTips"
            ></el-input>
          </el-form-item>
          <el-form-item label="英雄皮肤" class="upload">
            <ul class="d-flex flex-wrap show-skins p-0">
              <li class="mr-2" v-for="item in model.skins" :key="item._id">
                <img :src="item.cover" alt="" />
              </li>
            </ul>
          </el-form-item>
        </el-tab-pane>
        <!-- 技能栏目 -->
        <el-tab-pane label="技能信息" name="skills">
          <el-button @click="model.skills.push({})"
            ><i class="el-icon-plus"></i> 添加技能</el-button
          >
          <el-row
            v-for="(item, index) in model.skills"
            :key="index"
            style="flex-wrap: wrap"
            type="flex"
          >
            <el-col :md="12">
              <el-form-item label="技能名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="技能消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="技能冷却">
                <el-input v-model="item.cooldown"></el-input>
              </el-form-item>

              <el-form-item label="技能描述"
                ><el-input
                  :autosize="{ minRows: 2 }"
                  type="textarea"
                  resize="none"
                  v-model="item.description"
                ></el-input
              ></el-form-item>

              <el-form-item label="技能提示">
                <el-input v-model="item.tips"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="图标" class="upload partner">
                <el-upload
                  class="avatar-uploader"
                  :headers="getAuthHeaders()"
                  :action="uploadURL"
                  :show-file-list="false"
                  :on-success="(res) => $set(item, 'icon', res.url)"
                >
                  <!-- afterUpload指的是在上传完毕之后触发的方法 -->
                  <!-- action是指上传的地址 -->
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="danger"
                  size="small"
                  @click="model.skills.splice(index, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
            <div class="hr"></div>
          </el-row>
        </el-tab-pane>
        <!-- 搭档栏目 -->
        <el-tab-pane label="最佳搭档" name="partner">
          <el-button class="mb-2" @click="model.partner.push({})"
            ><i class="el-icon-plus"></i> 添加搭档</el-button
          >
          <el-row
            v-for="(item, index) in model.partner"
            :key="`partner${index}`"
            style="flex-wrap: wrap"
            type="flex"
          >
            <el-col :md="12">
              <el-form-item label="英雄">
                <el-select filterable v-model="item.hero">
                  <el-option
                    :label="`${item.title}-${item.name}`"
                    :value="item._id"
                    v-for="item in heroes"
                    :key="item._id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="搭档描述"
                ><el-input
                  :autosize="{ minRows: 2 }"
                  type="textarea"
                  resize="none"
                  v-model="item.description"
                ></el-input
              ></el-form-item>
              <el-form-item>
                <el-button
                  type="danger"
                  size="small"
                  @click="model.partner.splice(index, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item style="margin-top: 1rem"
        ><el-button type="primary" native-type="submit"
          >提交</el-button
        ></el-form-item
      >
    </el-form>
  </div>
</template>

<script>
import {
  createNewHero,
  getHeroIdInfo,
  updateHero,
  getHeroList,
} from "@/api/admin/heroes.js";
import { getCategoryList } from "@/api/admin/categories.js";
import { mapState, mapActions } from "vuex";
export default {
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      model: {
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0,
        },
        skills: [],
        partner: [],
      },
      categories: {},
      heroes: {},
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      positions: [
        {
          name: "上路",
        },
        {
          name: "打野",
        },
        {
          name: "中路",
        },
        {
          name: "下路",
        },
        {
          name: "辅助",
        },
      ],
    };
  },
  methods: {
    ...mapActions("Equip", {
      getEquipList: "getEquipList",
    }),
    // 提交
    async save() {
      // 判断是更新还是创建
      if (this.id) {
        await updateHero(this.id, this.model);
      } else {
        await createNewHero(this.model);
      }
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    // 是以编辑的路由跳转进来的就触发该fetch，绑定数据到model上
    async fetch() {
      const { data: res } = await getHeroIdInfo(this.id);
      // 使用assign的目的是因为一开始如果英雄数据为空，是没有scores这个对象的，尽管model中可以初始化scores，但是会被后来的res直接赋值给剔除，所以使用assign可以保证有scores这个对象，以免引用scores.difficult会出（can not read difficult of undefined）之类的错误
      this.model = Object.assign({}, this.model, res);
    },
    afterUpload(res) {
      this.$set(this.model, "icon", res.url);
    },
    afterUploadSkins(res) {
      this.model.skins.push(res.url);
    },
    async fetchCategoires() {
      const { data: res } = await getCategoryList();
      let prepro = res.filter((ele) => {
        if (ele.parent) {
          return ele.parent.name == "英雄分类";
        }
      });
      this.categories = prepro;
    },
    async initHeroesList() {
      const { data: res } = await getHeroList();
      this.heroes = res;
    },
  },
  computed: {
    ...mapState({
      equipList: (state) => state.Equip.equipList,
    }),
  },
  created() {
    // 获取物品列表和分类列表
    this.fetchCategoires();
    this.initHeroesList();
    // 获取到分类options的选项数据
    this.id && this.fetch();
    // 从vuex中获取装备列表
    this.getEquipList();
  },
};
</script>

<style scoped>
li {
  list-style: none;
}
.upload /deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.upload /deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.upload /deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.upload /deep/ .avatar {
  width: 5rem;
  height: auto;
  display: block;
}
.partner {
  width: 5rem;
  height: auto;
}
.hr {
  width: 100%;
  border-bottom: 1px solid rgb(223, 223, 223);
  margin-bottom: 1.1538rem;
}
.show-skins li img {
  max-height: 10rem;
}
</style>
