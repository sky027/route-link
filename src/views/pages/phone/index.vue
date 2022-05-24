<template>
  <div>
    <div>
      <h1>手机信息列表</h1>
      <el-button @click="addInfo">新增</el-button>
      <el-button @click="testNet1()">测网速 1</el-button>
      <el-button @click="testNet2()">测网速 2</el-button>
      <el-button @click="testNet3()">测网速 3</el-button>
      <el-button @click="testNet4()">测网速 4</el-button>
      <el-button @click="testNet5()">测网速 5</el-button>
    </div>
    <div id="gas_chart" class="chart"></div>
    <div id="gas_chart2" class="chart"></div>
    <div id="gas_chart3" class="chart"></div>
  </div>
</template>

<script>
  import Net from 'network-speed-test';
  export default {
    name: "index",
    data() {
      return {
        chartOption: null,
        gasChart: null,
        gasLineChart: null,
        timer: null,
        total: 0,
        lineData: [],
        lineLabel: []
      }
    },
    mounted() {
      this.initGasData()
      this.initGasChart()
      this.lineGasChart()
      this.$nextTick(() => {
        this.refreshChart()
      })
    },
    methods: {
      addInfo() {
        this.$router.push({
          path: '/phone/addPhone',
          query: { type: 'add' }
        })
      },
      querySpeedWithImg() {
        const url = 'https://image.baidu.com/search/down?tn=download&ipn=dwnl&word=download&ie=utf8&fr=result&url=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252Fup.enterdesk.com%252Fedpic_source%252Fe9%252F3d%252Fb5%252Fe93db54835b1af1b81880aa0d7b2c411.jpg%26refer%3Dhttp%253A%252F%252Fup.enterdesk.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Dauto%3Fsec%3D1655867286%26t%3D8cfa4885cf2c5dee781fb57d73e3d75b&thumburl=https%3A%2F%2Fimg1.baidu.com%2Fit%2Fu%3D2046929938%2C4132829035%26fm%3D253%26fmt%3Dauto%26app%3D138%26f%3DJPEG%3Fw%3D889%26h%3D500'
        let size = 1613148 / 1024 / 1024
        return new Promise((resolve, reject) => {
          let start = null;
          let end = null;
          let img = document.createElement('img');
          start = new Date().getTime();
          img.onload = function (e) {
            end = new Date().getTime();
            const s = (end - start) / 1000;
            const speed = size / s * 10 + '';

            resolve(speed.substring(0, 5));
          }
          img.src = url;
        }).catch(err => { throw err });
      },
      testNet5() {
        window.setInterval(() => {
          this.querySpeedWithImg().then(res => {
            console.log('当前网速 = ', res  + ' MB/S');
          })
        }, 3000)
      },
      testNet1() {
        const url = 'https://image.baidu.com/search/down?tn=download&ipn=dwnl&word=download&ie=utf8&fr=result&url=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252Fup.enterdesk.com%252Fedpic_source%252Fe9%252F3d%252Fb5%252Fe93db54835b1af1b81880aa0d7b2c411.jpg%26refer%3Dhttp%253A%252F%252Fup.enterdesk.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Dauto%3Fsec%3D1655867286%26t%3D8cfa4885cf2c5dee781fb57d73e3d75b&thumburl=https%3A%2F%2Fimg1.baidu.com%2Fit%2Fu%3D2046929938%2C4132829035%26fm%3D253%26fmt%3Dauto%26app%3D138%26f%3DJPEG%3Fw%3D889%26h%3D500'
        const size = 1613148
        Net.getSpeedWithImg(url, size).then(
          speed => {
            console.log(speed);
          }
        )
      },
      testNet2() {
        const url = 'https://image.baidu.com/search/down?tn=download&ipn=dwnl&word=download&ie=utf8&fr=result&url=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252Fup.enterdesk.com%252Fedpic_source%252Fe9%252F3d%252Fb5%252Fe93db54835b1af1b81880aa0d7b2c411.jpg%26refer%3Dhttp%253A%252F%252Fup.enterdesk.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Dauto%3Fsec%3D1655867286%26t%3D8cfa4885cf2c5dee781fb57d73e3d75b&thumburl=https%3A%2F%2Fimg1.baidu.com%2Fit%2Fu%3D2046929938%2C4132829035%26fm%3D253%26fmt%3Dauto%26app%3D138%26f%3DJPEG%3Fw%3D889%26h%3D500'
        Net.getSpeedWithAjax(url).then(speed => {
          console.log(speed);
        });
      },
      testNet3() {
        Net.getNetSpeed('./speed.jpg', 3).then(speed => {
          console.log(speed);
        });
      },
      testNet4() {
        Net.getSpeedWithDnlink().then(res => {
          console.log(res);
        });
      },
      initGasChart() {
        let dom = document.getElementById('gas_chart2');
        this.gasChart = window.echarts.init(dom, null, {
          renderer: 'canvas',
          useDirtyRect: false
        });

        let option = {
          tooltip: {
            formatter: '{a} :<br/>{b} {c} Mbps'
          },
          series: [
            {
              name: '网速',
              type: 'gauge',
              min: 0,
              max: 300,
              progress: {
                show: true
              },
              detail: {
                valueAnimation: true,
                formatter: '{value}'
              },
              data: [
                {
                  value: 0,
                  name: 'SCORE'
                }
              ]
            }
          ]
        };

        if (option && typeof option === 'object') {
          this.gasChart.setOption(option);
        }
        window.addEventListener('resize', this.gasChart.resize);
      },
      initGasData() {
        let dom = document.getElementById('gas_chart');
        this.chartOption = window.echarts.init(dom, null, {
          renderer: 'canvas',
          useDirtyRect: false
        });
        let option = {
          series: [
            {
              type: 'gauge',
              center: ['50%', '60%'],
              startAngle: 200,
              endAngle: -20,
              min: 0,
              max: 300,
              splitNumber: 12,
              itemStyle: {
                color: '#FFAB91'
              },
              progress: {
                show: true,
                width: 30
              },
              pointer: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  width: 30
                }
              },
              axisTick: {
                distance: -45,
                splitNumber: 5,
                lineStyle: {
                  width: 2,
                  color: '#333'
                }
              },
              splitLine: {
                distance: -52,
                length: 14,
                lineStyle: {
                  width: 3,
                  color: '#333'
                }
              },
              axisLabel: {
                distance: -20,
                color: '#333',
                fontSize: 20
              },
              anchor: {
                show: false
              },
              title: {
                show: false
              },
              detail: {
                valueAnimation: true,
                width: '60%',
                lineHeight: 40,
                borderRadius: 8,
                offsetCenter: [0, 0],
                fontSize: 30,
                fontWeight: 'bolder',
                formatter: '{value}\nMbps',
                color: 'auto'
              },
              data: [
                {
                  value: 0
                }
              ]
            },
            {
              type: 'gauge',
              center: ['50%', '60%'],
              startAngle: 200,
              endAngle: -20,
              min: 0,
              max: 300,
              itemStyle: {
                color: '#FD7347'
              },
              progress: {
                show: true,
                width: 8
              },
              pointer: {
                show: false
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: false
              },
              axisLabel: {
                show: false
              },
              detail: {
                show: false
              },
              data: [
                {
                  value: 0
                }
              ]
            }
          ]
        };
        if (option && typeof option === 'object') {
          this.chartOption.setOption(option);
        }

        window.addEventListener('resize', this.chartOption.resize);
      },
      lineGasChart() {
        let dom = document.getElementById('gas_chart3');
        this.gasLineChart = window.echarts.init(dom, null, {
          renderer: 'canvas',
          useDirtyRect: false
        });
        let option = {
          xAxis: {
            type: 'category',
            data: ['0']
          },
          color: ['#01f52f'],
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [0],
              type: 'line',
              smooth: true,
              symbol: "none"
            }
          ]
        };

        if (option && typeof option === 'object') {
          this.gasLineChart.setOption(option);
        }

        window.addEventListener('resize', this.gasLineChart.resize);
      },
      // 刷新 refresh
      refreshChart() {
        const _this = this;
        this.timer = window.setInterval(() => {
          if (_this.total > 9) {
            window.clearInterval(_this.timer)
            return
          } else {
            _this.total++
            _this.lineLabel.push(_this.total + '')
          }
          _this.querySpeedWithImg().then(res => {
            console.log('当前网速 = ',res + ' MB/S');
            _this.lineData.push(res)
            _this.gasChart.setOption({
              series: [
                {
                  data: [
                    { value: res - 0 }
                  ]
                }
              ]
            });
            _this.chartOption.setOption({
              series: [
                {
                  data: [
                    {
                      value: res - 0
                    }
                  ]
                },
                {
                  data: [
                    {
                      value: res - 0
                    }
                  ]
                }
              ]
            });
            _this.gasLineChart.setOption({
              xAxis: {
                data: _this.lineLabel
              },
              series: [
                {
                  data: _this.lineData
                }
              ]
            });
          })
        }, 2500)
      }
    },
    beforeDestroy() {
      window.clearInterval(this.timer)
    }
  }
</script>

<style scoped lang="scss">
.chart{
  margin-left: 50px;
  margin-top: 50px;
  width: 450px;
  height: 380px;
  float: left;
}
</style>
