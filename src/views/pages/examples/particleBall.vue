<template>
  <div class="particleBall">
    <div id="jsi-particle-container" class="container"></div>
  </div>
</template>

<script>
import RENDERER from './RENDERER'
export default {
  name: "particleBall",
  data() {
    return {}
  },
  mounted() {
    RENDERER.init()
  },
  methods: {
    initLz() {
    }
  }
}
</script>

<style scoped lang="scss">
.particleBall {
  height: 835px;
  .container{
    width: 100%;
    height: 100%;
    background-color: #000000;
  }
}
</style>
