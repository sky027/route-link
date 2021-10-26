<template>
  <div class="organMenu" :class="sidebar.opened ? '' : 'collapse'">
    <div class="logo-box">
      <div class="img" :class="sidebar.opened ? '' : 'close'"></div>
    </div>
    <el-menu class="el-menu-vertical-warp"
       unique-opened router
       :default-active="activePath"
       :collapse="!sidebar.opened">
      <!-- 首页 -->
      <el-menu-item index="/mainPage">
        <i class="el-icon-data-analysis"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 一级 -->
      <el-submenu v-for="item in routeList" :index="item.path" popper-class="menu-popup">
        <template slot="title">
          <i :class="'el-icon-' + item.meta.icon"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </template>
        <span v-for="child in item.children" :key="child.path">
          <template v-for="child2 in child.children">
            <!-- 二级 -->
            <el-menu-item v-if="!child2.notDisplay && !child.notShow" :key="child2.path" :index="item.path + '/' + child.path +'/'+ child2.path">{{ child2.meta.title }}</el-menu-item>
            <el-submenu v-if="child2.children && child2.children.length > 0" :index="item.path + '/' + child.path +'/'+ child2.path">
              <template slot="title">
                <span slot="title">{{ child2.meta.title }}</span>
              </template>
              <template v-for="child3 in child2.children">
                <el-menu-item v-if="!child3.notDisplay" :index="item.path + '/' + child.path +'/'+ child2.path + child3.path">{{ child3.meta.title }}</el-menu-item>
              </template>
            </el-submenu>
          </template>
        </span>




        <!--<span v-for="child in item.children" :key="child.path">
          <el-pages-item v-if="child.noChild" :index="item.path + '/' + child.path">{{ child.meta.title }}</el-pages-item>
          <el-submenu v-else :index="item.path + '/' + child.path" popper-class="pages-popup">
            <span slot="title">{{ child.meta.title }}</span>
            <el-pages-item v-for="child2 in child.children" :key="child2.path"
                          :index="item.path + '/' + child.path + '/' + child2.path + '/' + child2.path">{{ child2.meta.title }}
            </el-pages-item>
          </el-submenu>
        </span>-->
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { asyncRoutes } from '@/router/index'
import {mapGetters } from 'vuex'


export default {
  name: 'OrganMenu',
  data() {
    return {
      activePath: '',
      isCollapse: false,
      routeList: []
    }
  },
  computed: {
    ...mapGetters(['sidebar'])
  },
  watch: {
    '$route': {
      immediate: true,
      handler(to, from) {
        this.activePath = this.$route.path
      }
    }
  },
  created() {
    this.routeList = asyncRoutes
  }
}
</script>

<style scoped lang="scss">
$bgColor: #1891ff;
.organMenu{
  height: 100vh;
  width: 220px;
  transition: width 0.28s;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  &.collapse{
    width: 64px;
    transition: width 0.28s;
  }
  .logo-box {
    width: 100%;
    height: 99px;
    background: $bgColor;
    border-bottom: 1px solid #7ab9f1;
    display: flex;
    align-items: center;
    justify-content: center;
    .img {
      width: 72px;
      height: 74px;
      background-image: url("../../../assets/img/logo.png");
      background-size: 100%;
      transition: height 0.28s;
      &.close {
        width: 54px;
        height: 56px;
        transition: height 0.28s;
      }
    }
  }
}
</style>
