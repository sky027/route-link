<template>
  <div class="pie chart-container-box">
    <div class="charts-box">
      <div class="chart-title">图 标 类 型 切换</div>
      <button @click="changeType()">切换图表类型</button>
      <ve-chart :data="chartData3" :settings="chartSettings1"></ve-chart>
    </div>

    <div class="charts-box">
      <div class="chart-title">事件监听</div>
      <div class="chart-title">被点击日期：{{ name }}</div>
      <ve-pie :data="chartData1" :settings="chartSettings2" :events="chartEvents"></ve-pie>
    </div>

    <div class="charts-box">
      <div class="chart-title">设置工具箱/缩放/颜色</div>
      <ve-line :data="chartData3" :toolbox="toolbox" :data-zoom="dataZoom" :colors="colors"> </ve-line>
    </div>
    <div class="charts-box">
      <div class="chart-title">动态环形图</div>
      <div class="pie">
        <div class="input">
          <label class="label">名称：</label>
          <div class="value"><el-input v-model="label" />  </div>
          <label class="label">已完成：</label>
          <div class="value"><el-input-number v-model="value1" />  </div>
          <label class="label">未完成：</label>
          <div class="value"><el-input-number v-model="value2" />  </div>
          <el-button @click="initRingChart">生成图形</el-button>
        </div>
        <div class="box">
          <div class="ring" id="chart1"></div>
          <div class="ring" id="chart2"></div>
        </div>
      </div>
    </div>
    <div class="charts-box">
      <div class="chart-title">地图 - 百度地图</div>
      <ve-bmap :settings="bmap.chartSettings" :series="bmap.chartSeries" :tooltip="bmap.chartTooltip" :after-set-option-once="afterSet"></ve-bmap>
    </div>

    <div class="charts-box">
      <div class="chart-title">地图 - 高德地图</div>
      <ve-amap :settings="gmap.chartSettings" :series="gmap.chartSeries" :tooltip="gmap.chartTooltip"></ve-amap>
    </div>
  </div>
</template>

<script>
  export default {
    name: "chartEvent",
    data() {
      return {
        label: '',
        value1: 0,
        value2: 0,
        chartSettings1: {},
        chartSettings2: {},
        chartSettings3: {},
        chartSettings4: {},
        chartSettings5: {},
        chartSettings6: {},
        chartSettings7: {},
        chartSettings8: {},
        extend1: {},
        extend2: {},
        typeArr: ['line', 'histogram', 'pie'],
        index: 0,
        chartData1: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '1月1日', '访问用户': 1523 },
            { '日期': '1月2日', '访问用户': 1223 },
            { '日期': '1月3日', '访问用户': 2123 },
            { '日期': '1月4日', '访问用户': 4123 },
            { '日期': '1月5日', '访问用户': 3123 },
            { '日期': '1月6日', '访问用户': 7123 }
          ]
        },
        name: '',
        chartEvents: {},
        chartData3: {
          columns: ['日期', '成本', '利润', '总额'],
          rows: [
            { '日期': '1月1日', '成本': 15, '利润': 12, '总额': 31},
            { '日期': '1月2日', '成本': 12, '利润': 25, '总额': 73},
            { '日期': '1月3日', '成本': 21, '利润': 10, '总额': 46},
            { '日期': '1月4日', '成本': 41, '利润': 32, '总额': 20},
            { '日期': '1月5日', '成本': 31, '利润': 30, '总额': 58},
            { '日期': '1月6日', '成本': 71, '利润': 55, '总额': 39}
          ]
        },
        toolbox: {},
        dataZoom: [
          { type: 'slider', start: 0, end: 20 }
        ],
        colors: ['#c23531','#2f4554', '#61a0a8',
          '#d48265', '#91c7ae','#749f83',
          '#ca8622', '#bda29a','#6e7074',
          '#546570', '#c4ccd3'],
        bmap: {
          chartTooltip: { show: true },
          chartSeries: [
            {
              type: 'scatter',
              coordinateSystem: 'bmap',
              data: [
                [114.3162001, 30.58108413, 1] // 经度，维度，value，...
              ]
            }
          ],
          chartSettings: {}
        },
        gmap: {
          chartTooltip: { show: true },
          chartSeries: [
            {
              type: 'scatter',
              coordinateSystem: 'bmap',
              data: [
                [114.3162001, 30.58108413, 1] // 经度，维度，value，...
              ]
            }
          ],
          chartSettings: {}
        },
      }
    },
    mounted() {
      this.initSetting();
      this.initExtend();
    },
    methods: {
      initSetting() {
        let self = this;
        this.chartSettings1 = { type: this.typeArr[this.index] };
        this.chartSettings2 = {
          selectedMode: 'single',
          hoverAnimation: false
        };
        this.chartEvents = {
          click: function (e) {
            self.name = e.name;
            console.log(e)
          }
        };
        this.bmap.chartSettings = {
          key: 'oBvDtR6nzWtVchkY4cLHtnah1VVZQKRK',
          bmap: {
            center: [114.3162001, 30.58108413],
            zoom: 14,
            roam: true,
            mapStyle: {}
          }
        };
        this.gmap.chartSettings = {
          key: '4b5f2cf2cba25200cc6b68c398468899',
          v: '1.4.3',
          amap: {
            resizeEnable: true,
            center: [114.3162001, 30.58108413],
            zoom: 10
          }
        }
      },
      initExtend() {
        this.toolbox = {
          feature: {
            magicType: {type: ['line', 'bar']},
            saveAsImage: {}
          }
        };
      },
      changeType: function () {
        this.index++
        if (this.index >= this.typeArr.length) { this.index = 0 };
        this.chartSettings1 = { type: this.typeArr[this.index] };
      },
      afterSet: function (echarts) {
        var bmap = echarts.getModel().getComponent('bmap').getBMap();
        bmap.addControl(new window.BMap.MapTypeControl());
      },
      initRingChart() {
        this.initCircleChart('chart1', this.value1, '#3279f0', this.label);
        this.initCircleChart('chart2', this.value2, '#f39705', this.label);
      },
      initCircleChart(id, already, color, title) {
        color = color ? color : '#3279f0';
        var surplus = 100 - already;
        var chart2 = this.$echarts.init(document.getElementById(id));
        var option = {
          tooltip: {show: false},
          legend: {show: false},
          color: [color, '#eff0f4'],
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['82%', '90%'],
              avoidLabelOverlap: false,
              hoverAnimation: false,
              cursor: 'default',
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  fontSize: 14,
                  lineHeight: 16,
                  formatter: '{b}\n{d}.00%', // {b}:数据名； {c}：数据值； {d}：百分比，可以自定义显示内容，
                  fontStyle: 'normal'
                }
              },
              emphasis: {
                label: {show: false}
              },
              labelLine: {show: false},
              data: [
                {
                  value: already,
                  name: title,
                  label: {
                    normal: {show: true}
                  },
                  itemStyle:{
                    normal:{color: color},
                    emphasis:{color: color}
                  }
                },
                {
                  value: surplus,
                  name: '',
                  label: {
                    normal: {show: false}
                  },
                  itemStyle:{
                    normal:{color: '#eff0f4'},
                    emphasis:{color: '#eff0f4'}
                  }
                }
              ]
            }
          ]
        };
        if (option) {
          chart2.setOption(option, true);
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .charts-box{
    height: 500px;
    .pie{
      height: 90%;
      .input{
        display: flex;
        height: 40px;
        line-height: 40px;
        /deep/ .el-input-number{
          width: 130px;
        }
      }
      .box{
        height: calc(100% - 45px);
        display: flex;
        justify-content: space-around;
        .ring{
          height: 100%;
          width: 48%;
        }
      }
    }
  }
  button{
    cursor: pointer;
  }
</style>
