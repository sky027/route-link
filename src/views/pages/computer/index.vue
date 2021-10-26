<template>
  <div>
    <h1>电脑信息列表</h1>
    <el-button @click="addInfo">新增</el-button>
  </div>
</template>

<script>
  export default {
    name: "index",
    methods: {
      addInfo() {
        this.$router.push({
          path: '/computer/addInfo',
          query: { type: 'add' }
        })
      }
    }
  }
</script>

<style scoped>

</style>
