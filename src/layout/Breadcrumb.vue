<template>
  <div class="breadcrumb">
    <div v-for="(item, index) in routeList" :key="index" class="bread-item">
      <i :class="item.icon" class="tag-icon"></i>
      <i v-if="index > 0" class="split-line" :class="{'color': index === routeList.length-1 && routeList.length > 1}">/</i>
      <span class="txt" :class="{'color': index === routeList.length-1 && routeList.length > 1}">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data() {
    return {
      routeList: [],
      currentPath: ''
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        const bread = this.$route.meta.breadcrumb || []
        this.routeList = bread.map(v => {
          return {
            path: v.path,
            icon: v.icon ? v.icon : '',
            name: v.name
          }
        })
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
.breadcrumb{
  height: 47px;
  line-height: 47px;
  display: flex;
  background: #fff;
  color: #333333;
  padding: 0 15px;
  box-shadow: 0 3px 0 rgba(204, 204, 204, 0.5);
  .bread-item{
    display: flex;
    i {
      display: inline-block;
      font-style: normal;
    }
    .tag-icon{
      font-size: 20px;
      line-height: 47px;
      padding-right: 3px;
    }
    .txt{
      display: inline-block;
    }
    .split-line{
      font-size: 20px;
      padding: 0 8px;
    }
    .color{
      color: #999999;
    }
  }
}
</style>
