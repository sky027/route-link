<template>
  <div class="mockData">
    <div class="opt">
      <h5>展示 mock.js 生成数据</h5>
      <el-button @click="getMockData(1)">获取数据</el-button>
      <el-button @click="getMockData(2)">获取用户数据</el-button>
      <el-button @click="writeFile">加密</el-button>
    </div>
    <div class="result">
      {{ resultData }}
    </div>
  </div>
</template>

<script>
  import {encryptAndDecode} from "../../../utils/encryp";

  export default {
    name: "mockData",
    data() {
      return {
        resultData: ''
      }
    },
    methods: {
      getMockData(type) {
        switch (type) {
          case 1:
            this.$request.get('api/carousel', {}, res => {
              console.log(res)
              this.resultData = res
              // this.resultData = JSON.stringify(res)
            }, err => {
              console.log(err)
            })
          break
          case 2:
            this.$request.get('api/user', {}, res => {
              console.log(res)
              this.resultData = res
            })
          break
        }
      },
      writeFile() {
        const str = encryptAndDecode.encrypt('测试')
        const ss = encryptAndDecode.decrypt(str)
      }
    }
  }
</script>

<style scoped lang="scss">
.mockData{
  padding: 20px;
  .opt{
    height: 140px;
  }
  .result{
    height: 520px;
    border: 1px solid #d4d0d0;
  }
}
</style>
