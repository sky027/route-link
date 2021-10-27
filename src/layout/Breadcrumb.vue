<template>
  <div class="breadcrumb">
    <div v-for="(item, index) in routeList" :key="index" class="bread-item">
      <i :class="item.icon" class="tag-icon"></i>
      <i v-if="index > 0" class="split-line" :class="{'color': index === routeList.length-1 && routeList.length > 1}">/</i>
      <span class="txt" :class="{'color': index === routeList.length-1 && routeList.length > 1}">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data() {
    return {
      routeList: [],
      currentPath: '',
      //设置超时时间： 30分种
      timeOut : 30 * 60 * 1000,
      timer: null
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        const bread = this.$route.meta.breadcrumb || []
        this.routeList = bread.map(v => {
          return {
            path: v.path,
            icon: v.icon ? v.icon : '',
            name: v.name
          }
        })
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    // 每30秒 调用检查时间的方法
    this.$nextTick(function () {
      this.timer = window.setInterval(this.checkTimeout, this.timeOut)
    })
    // 页面监听 按下鼠标更新操作时间
    window.document.body.onclick = function () {
      localStorage.setItem('lastTime', new Date().getTime() + '')
    }
  },
  methods: {
    checkTimeout() {
      //更新当前时间
      let currentTime = new Date().getTime()
      let lastTime = localStorage.getItem('lastTime')
      if (!lastTime) {
        this.loginOut()
      }
      //判断是否超时
      if (currentTime - lastTime > this.timeOut) {
        this.loginOut()
      }
    },
    loginOut() {
      window.localStorage.clear()
      window.localStorage.removeItem('lastTime')
      this.$router.push('/login')
      window.location.reload()
    }
  },
  destroyed() {
    window.document.body.onclick = null
    window.clearInterval(this.timer)
  }
}
</script>

<style scoped lang="scss">
.breadcrumb{
  height: 47px;
  line-height: 47px;
  display: flex;
  background: #fff;
  color: #333333;
  padding: 0 15px;
  box-shadow: 0 3px 0 rgba(204, 204, 204, 0.5);
  .bread-item{
    display: flex;
    i {
      display: inline-block;
      font-style: normal;
    }
    .tag-icon{
      font-size: 20px;
      line-height: 47px;
      padding-right: 3px;
    }
    .txt{
      display: inline-block;
    }
    .split-line{
      font-size: 20px;
      padding: 0 8px;
    }
    .color{
      color: #999999;
    }
  }
}
</style>
