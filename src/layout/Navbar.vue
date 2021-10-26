<template>
  <div class="navBar">
    <div class="left-bar">
      <div class="all-menu">
        <i class="icon el-icon-location"></i>
      </div>
    </div>
    <div class="right-bar">
      <div class="item item-msg">
        <i class="iconfont icon-message"></i>
        <i class="num">9</i>
      </div>
      <div class="item item-lock">
        <i class="iconfont icon-lock"></i>
      </div>
      <div class="item item-set">
        <i class="iconfont icon-setting"></i>
      </div>
      <el-popover v-model="userVisible" placement="bottom" trigger="hover" popper-class="user-popover">
        <div class="user-pop-box">
          <div class="user-item el-select-dropdown__item">
            <i class="iconfont icon-edit"></i> <span>资料设置</span>
          </div>
          <div class="user-item el-select-dropdown__item">
            <i class="iconfont icon-yzm"></i> <span>修改密码</span>
          </div>
          <div class="user-item el-select-dropdown__item">
            <i class="iconfont icon-audit"></i> <span>登录记录</span>
          </div>
          <div class="user-item el-select-dropdown__item" @click="loginOut">
            <i class="iconfont icon-exit"></i> <span>退出系统</span>
          </div>
        </div>
        <div class="item item-user" slot="reference">
          <i class="iconfont icon-user"></i>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navBar',
  data() {
    return {
      showPop: false,
      searchMenu: '',
      userVisible: false,
      loading: false
    }
  },
  methods: {
    loginOut() {
      this.userVisible = true
      window.localStorage.clear()
      this.$router.push('/login')
      // this.$message.success('用户注销')
    }
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  height: 50px;
  line-height: 50px;
  position: relative;
  border-bottom:1px solid #f3eded;
  display: flex;
  background: #FFFFFF;
  justify-content: space-between;
  .left-bar{
    display: flex;
    .all-menu {
      display: flex;
      padding: 0 30px;
      .icon{
        display: flex;
        align-items: center;
      }
      .city{
        margin-left: 8px;
        position: relative;
        top: 8px;
      }
    }
  }
  .right-bar{
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    .item{
      width: 40px;
      height: 50px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #999999;
      margin: 0 10px;
      cursor: pointer;
      &:hover{
        color: #409eff;
      }
      .iconfont {
        font-size: 22px;
        &.icon-message{
          font-size: 24px;
        }
        &.icon-user{
          font-size: 24px;
        }
      }
      .num{
        width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        border-radius: 50%;
        font-style: normal;
        font-size: 12px;
        background-color: #f56c6c;
        color: #FFFFFF;
        position: absolute;
        top: 5px;
        right: -6px;
      }
    }
  }
}
</style>
