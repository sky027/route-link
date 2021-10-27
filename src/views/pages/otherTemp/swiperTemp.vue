<template>
  <div class="swiperTemp">
    <h4>Swiper轮播</h4>
    <div class="swiper-container" id="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in 20" :key="item" :style="{background: setColor()}">slider {{item}}</div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <h6><split-line :height="1" /></h6>
    <h4>element-ui 轮播</h4>
    <div class="el-lunbo">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item" :style="{background: setColor()}">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="el-lunbo">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item" :style="{background: setColor()}">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  export default {
    name: "swiperTemp",
    data() {
      return {
        swiperOption: {
          slidesPerView: 4,
          slidesPerColumn: 2,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
      }
    },
    mounted() {
      this.$nextTick(() => {
        new this.$swiper ('#swiper', {
          direction: 'horizontal', // 垂直切换选项   vertical
          loop: false, // 循环模式选项
          autoplay: false,//可选选项，自动滑动
          slidesPerView: 3,//一行显示3个
          slidesPerColumn: 2,//显示2行
          centeredSlides: false,
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
        })
      });
    },
    methods: {
      setColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return 'rgb('+ r +', '+ g +', '+ b +')';
      }
    }
  }
</script>

<style scoped lang="scss">
  .swiperTemp{
    padding: 20px;
    .swiper-container{
      width: 720px;
      height: 305px;
      margin: 0;
    }
    .swiper-wrapper{
      height: 280px;
      .swiper-slide{
        width: 200px !important;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 30px;
        margin: 20px;
      }
    }
    .el-lunbo{
      width: 600px;
      .el-carousel__item h3 {
        color: #FFF;
        font-size: 22px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
      }
    }
  }
</style>
