<template>
  <div>
    <el-menu>
      <div class="side-bar-title">后台管理</div>
      <template v-for="menu_0 in menuData">
        <el-submenu v-if="menu_0.childMenu" :index="menu_0.id" :key="menu_0.id">
          <template slot="title">{{ menu_0.name }}</template>
          <template v-for="menu_1 in menu_0.childMenu">
            <el-submenu
              v-if="menu_1.childMenu"
              :index="menu_1.id"
              :key="menu_1.id"
            >
              <template slot="title">{{ menu_1.name }}</template>
              <template v-for="menu_2 in menu_1.childMenu">
                <el-menu-item :index="menu_2.url" :key="menu_2.id">{{
                  menu_2.name
                }}</el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item v-else :index="menu_1.url" :key="menu_1.id">{{
              menu_1.name
            }}</el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item v-else :index="menu_0.url" :key="menu_0.id">{{
          menu_0.name
        }}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      menuData: [
        {
          name: "一级导航-1",
          id: "1",
          parentId: 0,
          url: "comment1",
          childMenu: [
            {
              id: "3",
              name: "二级导航",
              parentId: 1,
              url: "comment3",
              childMenu: [
                {
                  id: "4",
                  name: "三级导航",
                  parentId: 3,
                  url: "comment4",
                },
              ],
            },
          ],
        },
        {
          id: "2",
          name: "一级导航-2",
          parentId: 0,
          url: "comment2",
        },
      ],
    };
  },
};
</script>
 
<style >
</style>