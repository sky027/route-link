<template>
  <div class="totalList">
    <el-table
      :data="tableData"
      border
      :summary-method="getSummaries"
      show-summary
      @cell-dblclick="singleClick"
      style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="amount1" sortable label="数值 1（元）">
        <template slot-scope="scope">
          <span v-if="!scope.row.flag[0].flag">{{scope.row.amount1}}</span>
          <el-input type="number" v-model.number="scope.row.amount1" v-if="scope.row.flag[0].flag"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="amount2" sortable label="数值 2（元）">
        <template slot-scope="scope">
          <span v-if="!scope.row.flag[1].flag">{{scope.row.amount2}}</span>
          <el-input type="number" v-model.number="scope.row.amount2" v-if="scope.row.flag[1].flag"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="amount3" sortable label="数值 3（元）">
        <template slot-scope="scope">
          <span v-if="!scope.row.flag[2].flag">{{scope.row.amount3}}</span>
          <el-input type="number" v-model.number="scope.row.amount3" v-if="scope.row.flag[2].flag"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <h6 class="line"><split-line :height="1"></split-line></h6>
    <el-table
      :data="tableData2" border
      :summary-method="getSummariesAuto"
      show-summary
      ref="defineTable"
      style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="100" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="amount1" sortable label="数值 1（元）"></el-table-column>
      <el-table-column prop="amount2" sortable label="数值 2（元）"></el-table-column>
      <el-table-column prop="amount3" sortable label="数值 3（元）"></el-table-column>
      <el-table-column prop="price" sortable label="单价">
        <template slot-scope="scope">
          <el-input type="number" min="0" max="99" maxlength="2" v-model.number="scope.row.price"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="count" sortable label="数量">
        <template slot-scope="scope">
          <el-input type="number" v-model.number="scope.row.count"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="total" sortable label="金额">
        <template slot-scope="scope">
          <span>{{setTotal(scope.row, scope.$index)}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "totalList",
    data() {
      return {
        tableData: [
          { id: '20160502', name: '王小虎1', amount1: '518', amount2: 177, amount3: 137,
            flag: [
              {props: 'amount1', flag: false},
              {props: 'amount2', flag: false},
              {props: 'amount3', flag: false}
            ]
          },
          { id: '20160504', name: '王小虎2', amount1: '117', amount2: 234, amount3: 209,
            flag: [
              {props: 'amount1', flag: false},
              {props: 'amount2', flag: false},
              {props: 'amount3', flag: false}
            ]
          },
          { id: '20160501', name: '王小虎3', amount1: '319', amount2: 363, amount3: 116,
            flag: [
              {props: 'amount1', flag: false},
              {props: 'amount2', flag: false},
              {props: 'amount3', flag: false}
            ]
          },
          { id: '20160503', name: '王小虎4', amount1: '151', amount2: 265, amount3: 153,
            flag: [
              {props: 'amount1', flag: false},
              {props: 'amount2', flag: false},
              {props: 'amount3', flag: false}
            ]
          }
        ],
        currentRow: null,
        tableData2: [
          { id: '20160502', name: '王小虎1王小虎1王小虎1王小虎1王小虎1王小虎1', amount1: '518', amount2: 177, amount3: 137, price: 2.00, count: 5, total: 0},
          { id: '20160504', name: '王小虎2', amount1: '117', amount2: 234, amount3: 209, price: 4.00, count: 5, total: 0},
          { id: '20160501', name: '王小虎3', amount1: '319', amount2: 363, amount3: 116, price: 3.00, count: 4, total: 0},
          { id: '20160503', name: '王小虎4', amount1: '151', amount2: 265, amount3: 153, price: 4.00, count: 6, total: 0}
        ],
      }
    },
    mounted() {
      var self = this;
      this.$nextTick(() => {
        document.body.onclick  = function(event) {
          var dom = event.target.closest("td");
          if(!dom || dom.tagName != "TD"){
            let list = self.tableData;
            for(var i=0,len=list.length; i<len; i++){
              list[i].flag.forEach((v, k) => {
                list[i].flag[k].flag = false;
              });
            }
          }
        }
      });
    },
    methods: {
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = '/';
          }
        });
        return sums;
      },
      singleClick(row, column, cell, event){
        let list = this.tableData;
        var key = column.property;
        for(var i=0,len=list.length; i<len; i++){
          if(list[i].id == row.id){
            list[i].flag.forEach((v, k) => {
              if(v.props == key){
                list[i].flag[k].flag = !list[i].flag[k].flag;
              } else {
                list[i].flag[k].flag = false;
              }
            });
          } else {
            list[i].flag.forEach((v, k) => {
              list[i].flag[k].flag = false;
            });
          }
        }
      },
      getSummariesAuto(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            //  debugger;
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            if(column.property == 'amount1'){
              sums[index] += ' 元';
            } else if(column.property == 'amount2'){
              sums[index] += ' 角';
            } else if(column.property == 'amount3'){
              sums[index] += ' 分';
            } else {
              sums[index] += ' AA';
            }
          } else {
            sums[index] = '';
          }
        });
        return sums;
      },
      setTotal(row, index) {
        let total = row.price * row.count;
        this.tableData2[index].total = total;
        return total;
      }
    }
  }
</script>

<style scoped lang="scss">
.totalList{
  padding: 20px;
  .line{
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
