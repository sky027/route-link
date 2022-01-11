<template>
  <div class="weather">AAAA
    <div class="box-we">
      <ul class="be-over">
        <li class="item" v-for="(item, index) in weather" :key="index">
          <p class="item-txt a">{{item.label}}</p>
          <p class="item-txt">{{item.date}}</p>
          <p class="item-txt d"><i :class="item.icon"></i></p>
          <p class="item-txt b"><i class="el-icon-position"></i> <i> <{{ item.windLevel }}级</i></p>
          <p class="item-txt c"><i>{{ item.statusName }}</i></p>
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
            color: 'rgba(255, 255, 255, 0.8)',
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
        markPoint: {     //显示一定区域内的最大值和最小值
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' }
          ]
        }
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
    initLineChart() {
      const dom = document.getElementById('chart_over');
      const chart = this.$echarts.init(dom);
      const option = {
        color: ['#3aa1ff', '#4cca73'],
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
      chart.setOption(option, true);
    }
  }
}
</script>

<style scoped lang="scss">
.weather{
  padding: 20px;
  position: relative;
  .box-we{
    width: 770px;
    height: 410px;
    //margin: 20px auto;
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
