<template>
  <div class="vueAnimation">
    <div class="box">
      <el-button @click="boxshow = !boxshow">点击展开/关闭</el-button>
      <transition name="expandBox">
        <div class="collapse-wrap"  v-show="boxshow">
          vue内置过度动画组件实现
        </div>
      </transition>
      <h5>AAAAAAA</h5>
    </div>
    <div class="box">
      <el-button @click="isFade = !isFade">淡入/淡出</el-button>
      <div style="height: 200px">
        <transition name="fade">
          <div class="collapse-wrap" v-if="isFade">
            <div class="c-box">vue内置过度动画组件实现</div>
          </div>
        </transition>
      </div>
      <h5>BBBBBB</h5>
    </div>
    <div class="box">
      <el-button @click="widthFade = !widthFade">宽度变化</el-button>
      <div class="width" :class="widthFade ? '' : 'closed'">
        transition动画实现 <br>
        宽度缩放到指定数值
      </div>
      <h5>CCCCCCC</h5>
    </div>
    <div class="box">
      <el-button @click="heightFade = !heightFade">高度 变化</el-button>
      <div class="heights" :class="heightFade ? '' : 'closed'">
        transition动画实现 <br>
        高度缩放到指定数值
      </div>
      <h5>DDDDDD</h5>
    </div>
  </div>
</template>

<script>
  export default {
    name: "vueAnimation",
    data() {
      return{
        boxshow: true,
        isFade: true,
        widthFade: true,
        heightFade: true,
      }
    },
    methods: {

    }
  }
</script>

<style scoped lang="scss">
.vueAnimation{
  padding: 20px;
  display: flex;
  .box{
    width: 300px;
    margin: 10px;
  }
  .collapse-wrap{
    width: 300px;
    height: 200px;
    border: 2px solid #ee3571;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    .c-box{
      width: 100px;
      height: 50px;
      background: #df8585;
    }
  }
  /* 展开 收起*/
  .expandBox-enter-active, .expandBox-leave-active {
    transition: all 1s ease;
  }
  .expandBox-enter, .expandBox-leave-to {
    height: 0;
  }
  /* 淡入 淡出 */
  /*.fade-enter-active, .fade-leave-active {
    transition: opacity 1s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }*/
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
  .fade-enter-active, .fade-leave-active{
    transition: opacity 1s linear;
  }

  .box .width {
    width: 300px;
    height: 200px;
    border: 2px solid #ee3571;
    transition: width 0.9s linear;
    &.closed{
      width: 60px;
      transition: width 0.9s linear;
    }
  }
  .box .heights{
    width: 300px;
    height: 200px;
    border: 2px solid #ee3571;
    transition: height 0.9s linear;
    &.closed{
      height: 40px;
      transition: height 0.9s linear;
    }
  }
}
</style>
