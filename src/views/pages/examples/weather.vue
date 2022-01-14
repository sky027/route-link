<template>
  <div class="weather">
    <div class="opt">
      <el-button type="primary" icon="el-icon-refresh" @click="refresh('1')">手动刷新</el-button> <br> <br>
      <el-select v-model="times" clearable placeholder="请选择时间">
        <el-option v-for="item in [2, 4, 6, 8]" :key="item" :value="item" :label="item + ' 秒'" />
      </el-select>
      <el-button type="primary" icon="el-icon-refresh" @click="refreshTime">定时刷新</el-button>
    </div>
    <div class="box-we">
      <ul class="be-over">
        <li class="item" v-for="(item, index) in weather" :key="index">
          <p class="item-txt a">{{item.label}}</p>
          <p class="item-txt">{{item.date}}</p>
          <p class="item-txt d"><i :class="item.icon"></i></p>
          <p class="item-txt b"><i class="el-icon-position"></i> <i> <{{ item.windLevel }}级</i></p>
          <p class="item-txt c"><i class="status" :style="{'background': item.color}">{{ item.statusName }}</i></p>
        </li>
      </ul>
      <div class="af-over" id="chart_over"></div>
    </div>
  </div>
</template>

<script>
import weatherData from '@/utils/weatherData'
export default {
  name: "weather",
  data() {
    return {
      weather: [],
      chartObj: null,
      times: 2,
      intervalTime: null,
      chartData: []
    }
  },
  created() {
    this.weather = weatherData.initData();
    for (let i = 0; i < 2; i++) {
      const d = {
        type: 'line',
        stack: 'Total',
        smooth: true,
        data: [],
        showSymbol: true,
        hoverAnimation: false,
        symbolSize: 10,
        symbolKeepAspect: true,
        label: {
          show: true,
          position: 'bottom',
          textStyle: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: 12,
          },
          formatter: (param) => {
            return param.value + '°'
          }
        },
        itemStyle:{
          normal:{
            color:'rgba(255, 255, 255, 0.6)', //折点颜色
            lineStyle:{
              color:'rgba(255, 255, 255, 0.6)' //折线颜色
            }
          }
        },
        animation: false,
      };
      this.chartData.push(d)
    }
    this.chartData[0].label.position = 'top'
    this.weather.forEach(item => {
      this.chartData[0].data.push(item.maxTemper)
      this.chartData[1].data.push(item.minTemper)
    })
  },
  mounted() {
    this.initLineChart()
  },
  methods: {
    refresh(type) {
      if (type === '1' && this.intervalTime) {
        window.clearInterval(this.intervalTime)
      }
      this.weather = weatherData.initData();
      this.chartData[0].data = [];
      this.chartData[1].data = [];
      this.weather.forEach(item => {
        this.chartData[0].data.push(item.maxTemper)
        this.chartData[1].data.push(item.minTemper)
      })
      this.initLineChart();
    },
    refreshTime() {
      window.clearInterval(this.intervalTime)
      this.intervalTime = window.setInterval(() => {
        this.refresh('2')
      }, parseInt(this.times) * 1000)
    },
    initLineChart() {
      const dom = document.getElementById('chart_over');
      this.chartObj = this.$echarts.init(dom);
      const option = {
        grid: {
          top: '12%',
          left: '-2%',
          right: '1%',
          bottom: '12%',
          containLabel: true
        },
        xAxis: {
          show: false,
          type: 'category',
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: this.chartData
      };
      this.chartObj.setOption(option, true);
    },
    destroyed() {
      if (this.intervalTime) {
        window.clearInterval(this.intervalTime)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.weather{
  padding: 20px;
  position: relative;
  .opt{
    height: 50px;
  }
  .box-we{
    width: 770px;
    height: 410px;
    margin: 20px auto;
    background: #91a5b5;
    position: relative;
    .be-over{
      display: flex;
      list-style: none;
      height: 100%;
    }
    .item{
      width: 110px;
      height: 100%;
      box-sizing: border-box;
      color: #FFFFFF;
      position: relative;
      border-right: 1px solid rgba(255, 255, 255, 0.3);
      &:last-child{
        border-right: none;
      }
      i{
        font-style: normal;
      }
      .item-txt{
        width: 100%;
        padding: 13px 0;
        text-align: center;
        &.a{
          margin-top: 20px;
        }
        &.b{
          position: absolute;
          bottom: 55px;
        }
        &.c{
          position: absolute;
          bottom: 15px;
          font-size: 12px;
        }
        &.d{
          font-size: 28px;
        }
        .status{
          display: inline-block;
          width: 42px;
          height: 20px;
          line-height: 20px;
          border-radius: 9px;
          color: #fff;
          font-size: 12px;
        }
      }
    }
    .af-over{
      width: 770px;
      height: 155px;
      position: absolute;
      top: 155px;
    }
  }
}
</style>
