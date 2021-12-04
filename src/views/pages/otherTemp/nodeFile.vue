<template>
  <div class="nodeFile">
    <el-button @click="flag = true">校 验</el-button>
    <!-- 拼图验证码 -->
    <div v-show="flag" class="testCode">
      <p class="closeBtn"><i class="el-icon-close" @click="flag=!flag"></i></p>
      <slide-verify
        :l="42"
        :r="20"
        :w="362"
        :h="140"
        slider-text="向右滑动"
        @success="onSuccess"
        @fail="onFail"
        @refresh="onRefresh"
        :style="{width:'362px'}"
        class="slide-box"
        ref="slideBlock"
        v-show="flag"
      ></slide-verify>
    </div>
  </div>
</template>

<script>
  export default {
    name: "nodeFile",
    data() {
      return {
        msg: '',
        flag: false,
      }
    },
    methods: {
      // 拼图成功
      onSuccess (){
        this.getLogin()
      },
      // 拼图失败
      onFail (){
        this.msg = ''
      },
      // 拼图刷新
      onRefresh (){
        this.msg = ''
      },
      // 登录请求接口
      getLogin () {
        this.$message.success('验证成功')
      },
      // 点击登录校验-拼图出现
      submitForm (formName) {
        // 表单校验
        this.$refs[formName].validate((valid) => {
          // 验证通过
          if (valid) {
            // 拼图出现
            this.flag = true
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.nodeFile{
  padding: 20px;
}
</style>
