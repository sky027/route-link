<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import '@/utils/disableDevTool'
// import '@/utils/disableTool'

export default {
  name: 'App',
  data() {
    return {}
  },
  mounted() {
    window.addEventListener('storage', event => {
      window.location.reload()
    })
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
