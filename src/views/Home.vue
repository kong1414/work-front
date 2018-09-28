<template>
  <el-container class="home-container">
    <el-header>
      <div class="logo-box">
        <i class="el-icon-star-on logo-font"></i>
        <span>库存管理系统</span>
      </div>
      <div class="topbar-title">
        <div @click.prevent="collapse" class="collapse-icon">
          <i class="iconfont icon-indent" style="font-size:24px;" v-if="collapsed"></i>
          <i class="iconfont icon-outdent" style="font-size:24px;" v-if="!collapsed"></i>
        </div>
      </div>
      <div class="topbar-account">
        <el-dropdown>
          <span class="el-dropdown-link userinfo-inner">
            admin
            <i style="padding-left:5px" class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="changePasswords">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-menu
        class="el-menu-vertical"
        :collapse="collapsed"
        default-active="/home/index"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router>
        <el-menu-item index="/home/index">
          <i class="el-icon-document"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <!-- <el-menu-item index="/home/index">
          <i class="el-icon-upload2"></i>
          <span slot="title">出库管理</span>
        </el-menu-item>
        <el-menu-item index="/home/index">
          <i class="el-icon-download"></i>
          <span slot="title">入库管理</span>
        </el-menu-item>
        <el-menu-item index="/home/index">
          <i class="el-icon-goods"></i>
          <span slot="title">订单管理</span>
        </el-menu-item> -->
        <el-menu-item index="/home/warehouse">
          <i class="el-icon-news"></i>
          <span slot="title">库存管理</span>
        </el-menu-item>
        <el-submenu index="">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">系统管理</span>
          </template>
          <el-menu-item index="/home/usermanage">
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/home/rolemanage">
            <span slot="title">角色管理</span>
          </el-menu-item>
          <el-menu-item index="/home/aclmanage">
            <span slot="title">权限管理</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
      <el-container>
        <el-main>
          <transition name="fade" mode="out-in">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </el-main>
        <el-footer>
          <span>©2018</span>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  data () {
    return {
      collapsed: false
    }
  },
  computed: {
    asideWidth () {
      return this.collapsed ? '64px' : '250px'
    }
  },
  methods: {
    collapse () {
      this.collapsed = !this.collapsed
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  mounted () {
    // 监听窗口改变，当宽度小于768是隐藏侧边栏
    window.addEventListener('resize', () => {
      let width = document.body.clientWidth
      if (width <= 1024) {
        this.collapsed = true
      } else {
        this.collapsed = false
      }
    })
  }
}
</script>

<style lang="scss">
.home-container {
  width: 100%;
  height: 100%;
  .el-header {
    padding-left: 0px;
    line-height: 60px;
    background: #3a8ee6;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    color: white;
    .logo-box { // 左侧logo位
      // background-color: #3a8ee6;
      box-sizing: border-box;
      align-items: center;
      height: 60px;
      line-height: 60px;
      padding-left: 22px;
      width: 250px;
      float: left;
      .logo-font {
        font-size: 22px;
      }
      span {
        margin-left: 20px;
        font-size: 22px;
      }
    }
    .topbar-title {
      margin-left: 20px;
      float: left;
      text-align: left;
      .collapse-icon {
        cursor: pointer;
      }
    }
    .topbar-account {
      float: right;
      .el-dropdown {
        color: #fff;
      }
    }
    .userinfo-inner {
      cursor: pointer;
      padding-left: 10px;
    }
  }
  .el-container {
    .el-menu-vertical:not(.el-menu--collapse) {
      width: 250px;
      min-height: 400px;
    }
    .el-menu {
      border-radius: 0px;
      border-right-width: 0px;
    }
    .el-container {
      background: #f0f2f5;
      overflow-y: auto;
      .el-main {
        // min-height: -moz-calc(100% - 64px);
        // min-height: -webkit-calc(100% - 64px);
        // min-height: calc(100% - 64px);
        // height: auto !important;
        box-sizing: border-box;
        padding: 0px;
      }
      .el-footer {
        text-align: center;
        line-height: 60px;
        span {
          color: #aaabab;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
