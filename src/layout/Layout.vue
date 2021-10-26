<template>
  <div class="app-wrapper">
    <div class="left">
      <side-item></side-item>
      <div class="switchWarp" @click="changeStatus">
        <i class="el-icon-arrow-left"></i>
      </div>
    </div>
    <div class="right">
      <nav-bar :collapse="isOpened" />
      <breadcrumb />
      <div class="header">{{ $route.meta.title }}</div>
      <app-main />
    </div>
  </div>
</template>

<script>
  import SideItem from './SlideItem'
  import AppMain from './AppMain'
  import NavBar from './Navbar'
  import Breadcrumb from './Breadcrumb'
  export default {
    name: 'Layout',
    components: {
      SideItem,
      AppMain,
      Breadcrumb,
      NavBar
    },
    data() {
      return {
        isOpened: true
      }
    },
    methods: {
      changeStatus() {
        this.isOpened = !this.isOpened
      }
    }
  }
</script>

<style scoped lang="scss">
.app-wrapper{
  display: flex;
  height: 100%;
  .left{
    width: 220px;
    position: relative;
    .switchWarp{
      width: 10px;
      height: 100px;
      cursor: pointer;
      background-color: #e7e9eb;
      border-radius: 0 10px 10px 0;
      color: #FFFFFF;
      position: absolute;
      top: calc(50vh - 50px);
      right: -10px;
      font-size: 16px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .right{
    width: calc(100% - 235px);
    margin-left: 15px;
    border-left: 1px solid #bebaba;
    position: relative;
    .header{
      height: 30px;
      line-height: 30px;
      background-color: #f2f2f2;
      text-align: center;
      font-weight: bold;
      font-size: 22px;
      color: #409eff;
    }
  }
}
</style>
