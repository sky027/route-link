<template>
    <div class="selectTemp">
      <div class="slt">
        <el-cascader
          ref="cascader"
          v-model="value"
          :options="provinceAndCity"
          @change="handleChange">
        </el-cascader>
        <h4>
          选择结果：{{ resultStr }}
        </h4>
      </div>
      <div class="slt">
        <h5>日期时间禁用</h5>
        <div class="lh40 clearFixed">
          <div class="left">开始时间：</div>
          <div class="left">
            <el-date-picker v-model="startTime" type="date"
                            @change="getTimeValue" value-format="yyyy-MM-dd"
                            :picker-options="pickerStartTime"
                            placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </div>
        <br />
        <div class="lh40 clearFixed">
          <div class="left">结束时间：</div>
          <div class="left">
            <el-date-picker v-model="endTime" type="date"
                            @change="getTimeValue" value-format="yyyy-MM-dd"
                            :picker-options="pickerEndTime"
                            placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { AllProvinceData } from '@/utils/province'
  export default {
    name: "selectTemp",
    data() {
      return {
        provinceAndCity: [],
        value: [],
        resultStr: '',
        startTime: '',
        endTime: '',
        pickerStartTime: {
          disabledDate: time => {
            let s = new Date(time).getTime();
            let n = new Date().getTime();
            if (this.endTime) {
              let e = new Date(this.endTime).getTime();
              // 开始时间不能大于当前时间
              return (s > n || s > e);
            } else {
              return s > n;
            }
          }
        },
        pickerEndTime: {
          disabledDate: time => {
            let n = new Date().getTime();
            let e = new Date(time).getTime();
            if (this.startTime) {
              let s = new Date(this.startTime).getTime() - 24 * 3600 * 1000;
              return (e < s || e > n);
            } else {
              return e > n;
            }
          }
        },
      }
    },
    created() {
      this.provinceAndCity = AllProvinceData.getAllData(true);
    },
    methods: {
      handleChange(value) {
        var list = AllProvinceData.getAllData(false);
        var result = [];
        for(var k=0; k<value.length; k++){
          for(var i=0,len=list.length; i<len; i++){
            if(value[k] == list[i].value){
              var data = {
                value: value[k],
                label: list[i].label
              };
              result.push(data);
              continue;
            }
          }
        }
        this.resultStr = JSON.stringify(result);
        console.log(result);
      },
      getTimeValue() {
        console.log('开始时间', this.startTime);
        console.log('结束时间', this.endTime);
      }
    }
  }
</script>

<style scoped lang="scss">
.selectTemp{
  padding: 20px;
  .slt{
    margin-top: 30px;
  }
  .lh40{
    display: flex;
  }
}
</style>
