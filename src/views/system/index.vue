<template>
  <div>系统管理</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "index",
    computed: {
      ...mapGetters(['token'])
    },
    mounted() {
      console.log(this.token)
    }
  }
</script>

<style scoped>

</style>
