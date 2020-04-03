<template>
  <div id="layout">
    <div class="left-nav">
      <h1>
        <a href>
          <img src="../../images/log2.png" alt />
        </a>
      </h1>
      <el-row class="tac tacWidth">
        <el-col class="el">
          <el-menu
            default-active="0"
            class="el-menu-vertical-demo"
            v-for="(menu, index) in menus"
            :key="index"
            router
          >
            <el-submenu v-if="menu.children" :index="index + ''">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ menu.title }}</span>
              </template>
              <el-menu-item :index="v.path" v-for="(v, k) in menu.children" :key="k">{{ v.title }}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="menu.path">
              <i class="el-icon-menu"></i>
              <span slot="title">{{ menu.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="top">
      <div class="top-content">
        <div class="left-conten-list"></div>
        <div class="right-content-list">
          <el-row class="block-col-2">
            <el-col>
              <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                  {{ name }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">首页</el-dropdown-item>
                  <el-dropdown-item command="b">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="top-vav">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  name: "layout",
  data() {
    return {
      name: "",
      menus: []
    };
  },
  created() {
    this.navigationList();
    this.guanli();
  },
  methods: {
    navigationList() {
      this.axios({
        url: "/admin/manager/router",
        method: "post"
      }).then(res => {
        this.menus = res.data.menus;
      });
    },
    guanli() {
      this.axios({
        url: "/admin/manager/router",
        method: "post"
      }).then(res => {
        this.name = res.data.account.name;
      });
    },
    handleCommand(command) {
      if (command === "a") {
        this.$router.push("/");
      } else {
        this.$router.push("/login");
        Cookie.remove("token");
      }
    }
  }
};
</script>

<style spend>
#layout {
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
}
.left-nav {
  width: 200px;
}
.left-nav h1 a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 120px;
  background-color: #409eff;
}
.left-nav h1 a img {
  width: 80px;
  height: 80px;
}
.top {
  flex: 1;
  position: relative;
}
.top-content {
  background-color: #ffffff;
  justify-content: space-between;
  display: flex;
  height: 50px;
  width: 100%;
  z-index: 99999;
  top: 0;
  left: 200px;
  right: 0;
}
.top-content .right-content-list {
  margin: 26px 18px 0 0;
}
.top-vav {
  box-sizing: border-box;
  padding: 10px 15px;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  top: 60px;
  left: 0;
  bottom: 0;
  background-color: #ebedf0;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.top-nav-sun {
  margin: 10px 15px;
  background-color: red;
}
</style>
