<template>
  <div class="error404">
    <div class="info">
      <div class="item">4</div><div class="item">0</div><div class="item">4</div>
    </div>
    <div class="back">
      <div class="err">页面发生错误，点击 <span class="bak" @click="back"> 返回首页</span></div>
      <div class="time"><i>{{ time }}</i>秒后返回首页</div>
    </div>
    <el-button @click="back">返回首页</el-button>
  </div>
</template>

<script>
  export default {
    name: "page-404",
    data() {
      return {
        time: 5,
        timer: null
      }
    },
    mounted() {
      const that = this
      this.$nextTick(() => {
        that.timer = window.setInterval(() => {
          if (that.time > 0) {
            that.time--
          } else {
            that.back()
            window.clearInterval(that.timer)
          }
        }, 1000)
      })
    },
    methods: {
      back() {
        const token = window.localStorage.getItem('app_token')
        if (token) {
          this.$router.push('/index');
        } else {
          this.$router.push('/login');
        }
      }
    },
    destroyed() {
      window.clearInterval(this.timer)
    }
  }
</script>

<style scoped lang="scss">
.error404{
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: url("../../assets/img/404-bg.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .info{
    position: absolute;
    top: 130px;
    left: 50%;
    transform: translate(-50%, 0px);
    .item{
      display: inline-block;
      font-size: 260px;
      background-image: linear-gradient(135deg, #ffffff, #3f3939);
      background-clip: text;
      -webkit-background-clip:text;
      color: transparent;
      margin: 0 10px;
    }
  }
  .back{
    position: absolute;
    top: 450px;
    left: 50%;
    transform: translate(-50%, 0px);
    text-align: center;
    font-size: 18px;
    line-height: 36px;
    .err{
      color: #FFFFFF;
      .bak{
        cursor: pointer;
        &:hover{
          text-decoration: underline;
        }
      }
    }
    .time{
      color: #FFFFFF;
      i{
        font-style: normal;
        font-size: 20px;
        color: #ff0000;
        font-weight: 700;
        margin-right: 5px;
      }
    }
  }
}
</style>
