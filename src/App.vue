<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      //设置超时时间： 30分种
      timeOut : 30 * 60 * 1000
    }
  },
  mounted() {
    // 每30秒 调用检查时间的方法
    this.$nextTick(function () {
      setInterval(this.checkTimeout, 30000)
    })
    // 页面监听 按下鼠标更新操作时间
    window.onload = function () {
      window.document.onmousedown = function () {
        localStorage.setItem('lastTime', new Date().getTime() + '')
      }
    };
  },
  methods: {
    checkTimeout() {
      //更新当前时间
      let currentTime = new Date().getTime();
      let lastTime = localStorage.getItem('lastTime')
      //判断是否超时
      if (currentTime - lastTime > this.timeOut) {
        // 调用自己的注销接口
        if (this.$route.path !== '/login') {
          this.loginOut()
        }
      }
    },
    loginOut() {
      window.localStorage.clear()
      window.localStorage.removeItem('lastTime')
      this.$router.push('/login')
      window.location.reload()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #FFFFFF;
}
</style>
