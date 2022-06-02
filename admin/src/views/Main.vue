<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu
        router
        :default-openeds="list"
        :default-active="$route.path"
        unique-opened
      >
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-message"></i>内容管理</template
          >

          <el-menu-item-group>
            <template slot="title">装备</template>
            <el-menu-item index="/equips/create">新建装备</el-menu-item>
            <el-menu-item index="/equips/list">装备列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
            <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">皮肤</template>
            <el-menu-item index="/skins/create">新建皮肤</el-menu-item>
            <el-menu-item index="/skins/list">皮肤列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">符文</template>
            <el-menu-item index="/runes/create">新建符文</el-menu-item>
            <el-menu-item index="/runes/list">符文列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">战队</template>
            <el-menu-item index="/clubs/create">新增战队</el-menu-item>
            <el-menu-item index="/clubs/list">战队列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">职业选手</template>
            <el-menu-item index="/players/create">增加选手</el-menu-item>
            <el-menu-item index="/players/list">选手列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"
            ><i class="el-icon-message"></i>运营管理</template
          >
          <el-menu-item-group>
            <template slot="title">比赛</template>
            <el-menu-item index="/matches/create">新建比赛</el-menu-item>
            <el-menu-item index="/matches/matching">现有比赛</el-menu-item>
            <el-menu-item index="/matches/list">比赛历史</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">广告位</template>
            <el-menu-item index="/ads/create">新建广告位</el-menu-item>
            <el-menu-item index="/ads/list">广告位列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"
            ><i class="el-icon-message"></i>用户管理</template
          >
          <el-menu-item-group>
            <template slot="title">管理员</template>
            <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
html,
body {
  padding: 0;
  margin: 0;
}
</style>

<script>
export default {
  data() {
    return {
      list: ["1"],
    };
  },
};
</script>
