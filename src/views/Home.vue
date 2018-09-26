<template>
  <div class="home-container">
    <el-row>
      <aside>
        <el-row class="logo-box">
          <i class="el-icon-star-on logo-font"></i>
          <span>管理系统</span>
        </el-row>
        <el-menu
          default-active="1"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">
            <i class="el-icon-document"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-upload2"></i>
            <span slot="title">出库管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-download"></i>
            <span slot="title">入库管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-goods"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-news"></i>
            <span slot="title">库存管理</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="el-icon-info"></i>
            <span slot="title">角色管理</span>
          </el-menu-item>
          <el-menu-item index="8">
            <i class="el-icon-setting"></i>
            <span slot="title">权限管理</span>
          </el-menu-item>
        </el-menu>
      </aside>
      <section class="section-container">
        <!--头部-->
        <el-col :span="24" class="topbar-wrapper">
          <div class="topbar-title">
            <!-- 题头-->
          </div>
          <div class="topbar-account">
            <el-dropdown style="padding-right:20px;">
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
        </el-col>
        <el-col :span="24" class="content-wrapper">
          <section class="content-wrapper-main">
            <transition name="fade" mode="out-in">
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </transition>
          </section>
          <div class="footer">
            <span>©2018</span>
          </div>
        </el-col>
      </section>
    </el-row>
    <!-- <transition name="fade" mode="out-in">
      <keep-alive :include="keepAlive">
        <router-view></router-view>
      </keep-alive>
    </transition> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
.home-container {
  width: 100%;
  height: 100%;
  .el-row {
    width: 100%;
    height: 100%;
    overflow: hidden;
    aside {
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      width: 250px;
      background-color: #545c64;
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
      z-index: 1;
      &::-webkit-scrollbar {
        display: none;
      }
      .logo-box { // 左侧logo位
        background-color: #409EFF;
        box-sizing: border-box;
        align-items: center;
        height: 64px;
        line-height: 64px;
        padding-left: 16px;
        color: white;
        .logo-font {
          font-size: 22px;
        }
        span {
          margin-left: 10px;
          font-size: 22px;
        }
      }
      .el-menu {
        width: 250px;
        height: auto;
        border-radius: 0px;
        // background-color: #001529;
        border-right-width: 0px;
        padding: 0px 0xp 16px 0px;
      }
    }
    .section-container {
      background: #f0f2f5;;
      position: absolute;
      left: 250px;
      right: 0;
      top: 0;
      bottom: 0;
      overflow-y: auto;
      transition: left 0.3s ease-in-out;
      height: 100%;
      .topbar-wrapper {
        margin: 0;
        padding: 0px;
        height: 64px;
        line-height: 64px;
        background: #fff;
        -webkit-box-shadow: 1px 4px rgba(0, 21, 41, 0.08);
        box-shadow: 1px 4px rgba(0, 21, 41, 0.08);
        
        .topbar-title {
          float: left;
          text-align: left;
        }
        .topbar-account {
          float: right;
          padding-right: 12px;
        }
        .userinfo-inner {
          cursor: pointer;
          padding-left: 10px;
        }
      }
    }
    .content-wrapper {
      position: relative;
      height: auto !important;
      min-height: -moz-calc(100% - 64px);
      min-height: -webkit-calc(100% - 64px);
      min-height: calc(100% - 64px);
      background-color: #f0f2f5;
      box-sizing: border-box;
      .content-wrapper-main {
        
      }
      .footer {
        position: absolute;
        bottom: 24px;
        width: 100%;
        text-align: center;
        span {
          color: #aaabab;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
