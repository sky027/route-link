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
      alert('change');
      console.log(event);
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
