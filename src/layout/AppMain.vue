<template>
  <div class="main-page" ref="mainPage">
    <el-scrollbar style="height: 100%">
      <router-view />
    </el-scrollbar>
  </div>
</template>

<script>
  export default {
    name: "appMain"
  }
</script>

<style scoped lang="scss">
.main-page{
  height: calc(100vh - 130px);
}
</style>
