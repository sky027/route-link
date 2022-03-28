<template>
  <div class="nodeFile">
    <div class="ciu">
      <div class="codeBtn" id="v_container"></div>
      <el-input class="inp" v-model="codeVal" />
      <el-button @click="checkVal">校 验</el-button>
    </div>
    <div class="img">
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
    </div>
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
        codeVal: '',
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
      checkVal() {
        const f = this.verifyCode.validate(this.codeVal)
        if (f) {
          this.getLogin()
        } else {
          this.verifyCode.refresh()
          this.onFail()
        }
      },
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
        const that = this;
        // const url = 'https://picsum.photos/300/150/?image=' + CommonUtil.getRoundNum(0, 500); // 背景图片地址
        const url = 'https://picsum.photos/id/' + CommonUtil.getRoundNum(0, 500) + '/310/155'; // 背景图片地址
        let Slide = new SlideVerify({
          elementId: "slideCode", // DOM挂载点
          onSuccess: () => {
            that.getLogin()
          }, // 成功回调
          onFail: () => {
            that.initCode();
            that.onFail()
          }, // 失败回调
          onRefresh: () => {
            console.log("Slide  refresh")
            that.initCode();
          }, // 刷新回调
          photo: url
        })
      },
      initCode2() {
        const that = this
        jigsaw.init({
          el: document.getElementById('slideCode2'),
          width: 310, // 可选, 默认310
          height: 155, // 可选, 默认155
          onSuccess: function () {
            that.getLogin()
          },
          onFail: function () {
            that.onFail()
          },
          onRefresh: function () {
            console.log("jigsaw  refresh")
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.nodeFile{
  padding: 20px;
  .ciu{
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
    position: relative;
    .codeBtn{
      width: 120px;
      height: 50px;
    }
    .inp{
      width: 200px;
      height: 40px;
      font-size: 18px;
      margin: -10px 20px 0 20px;
    }
  }
  .img{
    display: flex;
    margin-top: 50px;
  }
  .other{
    margin: 30px auto;
  }
}
</style>
