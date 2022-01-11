<template>
  <div class="nodeFile">
    <el-button @click="flag = true">校 验</el-button>
    <!-- 拼图验证码 -->
    <div v-show="flag" class="testCode">
      <p class="closeBtn"><i class="el-icon-close" @click="flag=!flag"></i></p>
      <slide-verify
        :l="42"
        :r="20"
        :w="360"
        :h="160"
        :imgs="codeUrlList"
        :accuracy="accuracy"
        slider-text="向右滑动"
        @success="onSuccess"
        @fail="onFail"
        @refresh="onRefresh"
        class="slide-box"
        ref="slideBlock"
        v-show="flag"
      ></slide-verify>
    </div>
    <div class="other" id="slideCode"></div>
    <div class="other" id="slideCode2"></div>
    <div class="codeBtn" id="v_container"></div>
  </div>
</template>

<script>
  import '@/utils/validateCode'
  import CommonUtil from '@/utils/commonUtil'
  import SlideVerify from '../../../../node_modules/slide-verify/dist/slide-verify'
  import '../../../../static/js/jigsaw'
  export default {
    name: "nodeFile",
    data() {
      return {
        msg: '',
        flag: true,
        // 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5
        accuracy: 1,
        codeUrlList: [],
        verifyCode: null
      }
    },
    created() {
      for (let i = 0; i < 60; i++) {
        this.codeUrlList.push('https://picsum.photos/300/150/?image=' + CommonUtil.getRoundNum(0, 500))
      }
    },
    mounted() {
      if (window.GVerify) {
        // 只传入ID的时候
        // this.verifyCode = new GVerify('v_container');
        // 传入属性的时候
        this.verifyCode = new GVerify({
          id: 'v_container',
          length: 5
        });
      }
      this.initCode()
      this.initCode2()
    },
    methods: {
      // 拼图成功
      onSuccess (){
        this.getLogin()
      },
      // 拼图失败
      onFail (){
        this.$message.error('验证失败')
      },
      // 拼图刷新
      onRefresh (){
        this.msg = ''
      },
      // 登录请求接口
      getLogin () {
        this.$message.success('验证成功')
      },
      initCode() {
        let Slide = new SlideVerify({
          elementId: "slideCode", // DOM挂载点
          onSuccess: () => {
            this.$message.success('验证成功')
          }, // 成功回调
          onFail: () => {
            this.$message.error('验证失败')
          }, // 失败回调
          onRefresh: () => {
            console.log("refresh")
          }, // 刷新回调
          photo: 'https://picsum.photos/300/150/?image=' + CommonUtil.getRoundNum(0, 500) // 背景图片地址
        })
      },
      initCode2() {
        const that = this
        jigsaw.init({
          el: document.getElementById('slideCode2'),
          width: 310, // 可选, 默认310
          height: 155, // 可选, 默认155
          onSuccess: function () {
            that.$message.success('验证成功')
          },
          onFail: function () {
            that.$message.error('验证失败')
          },
          onRefresh: function () {
            console.log("refresh")
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.nodeFile{
  padding: 20px;
  .codeBtn{
    width: 120px;
    height: 50px;
    margin-top: 50px;
  }
  .other{
    margin: 30px auto;
  }
}
</style>
