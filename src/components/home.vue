<template>
  <el-container>
    <el-header>
      <div class="logo">
        <!-- <img
          src="@/assets/logo.png"
          height="50"
          width="50"
          style="margin: 10px"
        /> -->
        <span style="font-size: 30px; font-family: FZShuTi">Simple-Mall</span>
      </div>
      <div id="top-guidance">
        <el-button
          class="guidance-text-color"
          type="text"
          @click="dialogVisible = true"
          >您好，请登录</el-button
        >
        <el-divider direction="vertical"></el-divider>
        <el-button
          class="guidance-text-color"
          type="text"
          @click="dialogVisible = true"
          >免费注册</el-button
        >
        <el-divider direction="vertical"></el-divider>
        <el-button
          class="guidance-text-color"
          type="text"
          @click="dialogVisible = true"
          >我的订单</el-button
        >
        <el-divider direction="vertical"></el-divider>
        <el-button
          class="guidance-text-color"
          type="text"
          @click="dialogVisible = true"
          >我的商城</el-button
        >
      </div>
      <div>
        <span>Hello,</span>
        <el-button
          type="info"
          style="height: 40px; margin-top: 10px"
          @click="logout"
          >退出</el-button
        >
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <div>
          <!-- <side-bar :menuList="menuList" /> -->
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <el-menu
            background-color="#e3e4e5"
            text-color="black"
            active-text-color="#FF6666"
            :collapse="isCollapse"
            unique-opened
            :collapse-transition="false"
            router
            :default-active="active_index"
          >
            <template v-for="menu_0 in menuData">
              <el-submenu
                v-if="menu_0.childMenu"
                :index="menu_0.id"
                :key="menu_0.id"
              >
                <template slot="title">
                  <div @click="updateCatalogId(menu_0)">{{ menu_0.name }}</div>
                </template>
                <template v-for="menu_1 in menu_0.childMenu">
                  <el-submenu
                    v-if="menu_1.childMenu"
                    :index="menu_1.id"
                    :key="menu_1.id"
                  >
                    <template slot="title"> <div @click="updateCatalogId(menu_1)">{{ menu_1.name }}</div></template>
                    <template v-for="menu_2 in menu_1.childMenu">
                      <el-menu-item :index="menu_2.url" :key="menu_2.id"><div @click="updateCatalogId(menu_2)">{{ menu_2.name }}</div></el-menu-item>
                    </template>
                  </el-submenu>
                  <el-menu-item v-else :index="menu_1.url" :key="menu_1.id"><div @click="updateCatalogId(menu_1)">{{ menu_1.name }}</div></el-menu-item>
                </template>
              </el-submenu>
              <el-menu-item v-else :index="menu_0.url" :key="menu_0.id"><div @click="updateCatalogId(menu_0)">{{ menu_0.name }}</div></el-menu-item>
            </template>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
          <!-- <router-link></router-link> -->
        </el-main>
      </el-container>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      //是否折叠
      isCollapse: false,
      //被激活的index
      active_index: "/",
      catalog: "Food",
      catalogId: 1000,
      menuData: [
        {
          id: "1",
          name: "商品分类",
          parentId: 0,
          url: "/catalog",
        },
        {
          id: "2",
          name: "秒杀商品",
          parentId: 0,
          url: "/secKill",
        },
        {
          id: "3",
          name: "我的订单",
          parentId: 0,
          url: "/myOrder",
        },
        {
          id: "4",
          name: "个人中心",
          parentId: 0,
          url: "/myInfo",
        }
      ],
      menuData1: [
        {
          name: "视频",
          id: "1",
          parentId: 0,
          url: "productList",
          childMenu: [
            {
              id: "3",
              name: "二级导航",
              parentId: 1,
              url: "productList",
              childMenu: [
                {
                  id: "4",
                  name: "三级导航",
                  parentId: 3,
                  url: "productList",
                },
              ],
            },
          ],
        },
        {
          id: "2",
          name: "一级导航-2",
          parentId: 0,
          url: "productList",
        },
      ],
    };
  },
  created() {
    this.active_index = window.sessionStorage.getItem("index");
  },
  methods: {
    //点击按钮切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    updateCatalogId(menu_0) {
      console.log("menu_id");
      this.catalogId = menu_0.id;
      console.log(this.catalogId);
    },
    // 退出
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },

    //保存二级子菜单的index
    save_index(index) {
      this.active_index = index;
      window.sessionStorage.setItem("index", index);
    },
  },
};
</script>

<style >
.guidance-text-color {
  color: #e3e4e5;
}
.el-main {
  /* // background-image: url("../pic/mainImg.jpg"); */
  background-size: 100% 100%;
  height: 100%;
}
.el-menu-item {
  display: flex;
  justify-content: flex-start;
}

.el-icon-menu {
  display: flex;
  flex-flow: row wrap;
  align-content: center;
}

.el-container {
  height: 100%;
}

.el-submenu__icon-arrow {
  top: 56%;
  margin-top: -11px;
  transition: transform 0.3s;
  font-size: 18px;
  width: 18px;
  height: 18px;
  display: block;
  color: #ffffff;
}

.el-submenu__title {
  padding-right: 70px;
}

.el-header {
  background: -webkit-linear-gradient(left, #e3e4e5, white) no-repeat;
  color: #333;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  padding-left: 0px;
  > div {
    display: flex;
    align-items: center;
  }
  span {
    margin-left: 15px;
  }
}

.el-aside {
  background: -webkit-linear-gradient(top, #e3e4e5, #ccffcc) no-repeat;
  color: #333;
  text-align: center;
  line-height: 200px;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.toggle-button {
  background-color: #e3e4e5;
  font-size: 10px;
  line-height: 24px;
  color: #ffffff;
  letter-spacing: 0.3em;
  cursor: pointer;
}
</style>