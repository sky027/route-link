<template>
  <div>404
    <el-button @click="back">返回首页</el-button>
  </div>
</template>

<script>
  export default {
    name: "page-404",
    methods: {
      back() {
        this.$router.push('/index');
      }
    }
  }
</script>

<style scoped>

</style>
