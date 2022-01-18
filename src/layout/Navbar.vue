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
      <el-popover v-model="sysVisible" placement="bottom" trigger="hover" popper-class="user-popover">
        <div class="user-pop-box">
          <div class="user-item el-select-dropdown__item" @mouseenter="showLang = true" @mouseleave="showLang = false">
            <i class="iconfont el-icon-collection-tag"></i> <span>{{ $t('system.langSlt') }}</span>
            <div v-show="showLang" class="lang-pop">
              <div class="el-select-dropdown__item" @click="changeLang('zh')">简体中文</div>
              <div class="el-select-dropdown__item" @click="changeLang('en')">English</div>
            </div>
          </div>
          <div class="user-item el-select-dropdown__item">
            <i class="iconfont el-icon-connection"></i> <span>{{ $t('system.themeSlt') }}</span>
          </div>
        </div>
        <div class="item item-set" slot="reference">
          <i class="iconfont icon-setting"></i>
        </div>
      </el-popover>
      <el-popover v-model="userVisible" placement="bottom" trigger="hover" popper-class="user-popover">
        <div class="user-pop-box">
          <div class="user-item el-select-dropdown__item">
            <i class="iconfont icon-edit"></i> <span>{{ $t('system.profileSet') }}</span>
          </div>
          <div class="user-item el-select-dropdown__item">
            <i class="iconfont icon-yzm"></i> <span>{{ $t('system.editPassword') }}</span>
          </div>
          <div class="user-item el-select-dropdown__item">
            <i class="iconfont icon-audit"></i> <span>{{ $t('system.loginRecord') }}</span>
          </div>
          <div class="user-item el-select-dropdown__item" @click="loginOut">
            <i class="iconfont icon-exit"></i> <span>{{ $t('system.exitSys') }}</span>
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
import CommonUtil from "@/utils/commonUtil";

export default {
  name: 'navBar',
  data() {
    return {
      language: 'zh',
      showLang: false,
      showPop: false,
      searchMenu: '',
      userVisible: false,
      sysVisible: false,
      loading: false
    }
  },
  methods: {
    loginOut() {
      this.$confirm('此操作将退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.clear()
        this.$router.push('/login')
      })
    },
    changeLang(type) {
      const lang = CommonUtil.getStorageItem('language')
      if (lang !== type) {
        CommonUtil.setStorageItem('language', type)
        window.location.reload()
      }
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
    position: relative;
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
  .i18ns{
    width: 130px;
    /deep/ .el-input__inner{
      height: 28px;
      line-height: 28px;
    }
  }
}
</style>
