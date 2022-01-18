<template>
  <div class="organMenu" :class="collapse ? '' : 'collapse'">
    <div class="logo-box">
      <div class="img" :class="collapse ? '' : 'close'"></div>
    </div>
    <el-menu class="el-menu-vertical-warp"
             :collapse="!collapse"
             unique-opened router
             :default-active="$route.path">
      <template v-for="(item, index) in routerList">
        <el-submenu v-if="item.children && item.children.length > 0" :index="rootUrl + item.path">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ setMenuTitle(item) }}</span>
          </template>
          <span v-for="child in item.children">
            <el-submenu v-if="child.children && child.children.length > 0" :index="rootUrl + item.path +'/'+ child.path">
              <span slot="title">{{ setMenuTitle(child) }}</span>
              <el-menu-item v-for="child2 in child.children" :key="child2.path" :index="rootUrl + item.path +'/'+ child.path +'/'+ child2.path">{{ setMenuTitle(child2) }}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="!child.children && !child.hidden" :index="rootUrl + item.path +'/'+ child.path">{{ setMenuTitle(child) }}</el-menu-item>
          </span>
        </el-submenu>
        <el-menu-item v-else :index="rootUrl + item.path">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{ setMenuTitle(item) }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import { routeList } from '@/router/index'
  export default {
    name: "SlideItem",
    props: {
      collapse: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        rootUrl: '',
        routerList: []
      }
    },
    computed: {
      setMenuTitle() {
        return (item) => {
          if (item.meta.label) {
            return this.$t('sysRoute.'+ item.meta.label)
          } else {
            return item.meta.title
          }
        }
      }
    },
    created() {
      this.rootUrl = routeList[0].path + '/'
      this.routerList = routeList[0].children
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
  position: relative;
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
      background-image: url("../assets/img/flower.png");
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
