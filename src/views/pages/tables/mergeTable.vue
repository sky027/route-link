<template>
    <div class="mergeTable">
      <el-table :data="tableData2" style="width: 100%">
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column label="配送信息">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column label="地址">
            <el-table-column prop="province" label="省份"></el-table-column>
            <el-table-column prop="city" label="市区"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column prop="zip" label="邮编"></el-table-column>
          </el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
        </el-table-column>
      </el-table>
      <h6 class="line"><split-line :height="1"></split-line></h6>
      <div>
        <el-select v-model="selectValue">
          <el-option value="2" label="合并 2 列"></el-option>
          <el-option value="3" label="合并 3 列"></el-option>
          <el-option value="4" label="合并 4 列"></el-option>
          <el-option value="5" label="合并 5 列"></el-option>
        </el-select>
        <el-button @click="getActiveData()">动态合并单元格</el-button>
      </div><br>
      <el-table v-if="changeTable" :data="tableData4" style="width: 100%;" class="colTable">
        <el-table-column type="index" width="50">
          <template slot-scope="scope"><span>{{getIndex(scope)}}</span></template>
        </el-table-column>
        <el-table-column :prop="item.prop" :label="item.label" v-for="(item, index) of thead" :key="index">
          <el-table-column v-if="item.childHead && item.childHead.length>0"
                           v-for="(child, k) of item.childHead" :key="k" :prop="child.prop" :label="child.label"></el-table-column>
        </el-table-column>
      </el-table>
      <h6 class="line"><split-line :height="1"></split-line></h6>
      <h3>合并单元格</h3>
      <el-table :data="tableData" :span-method="arraySpanMethod" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="amount1" sortable label="数值 1"> </el-table-column>
        <el-table-column prop="amount2" sortable label="数值 2"> </el-table-column>
        <el-table-column prop="amount3" sortable label="数值 3"> </el-table-column>
      </el-table>
    </div>
</template>

<script>
  export default {
    name: "mergeTable",
    data() {
      return {
        tableData: [
          { id: '12987122', name: '王小虎', amount1: '234', amount2: '3.2', amount3: 10 },
          { id: '12987123', name: '王小虎', amount1: '165', amount2: '4.43', amount3: 12 },
          { id: '12987124', name: '王小虎', amount1: '324', amount2: '1.9', amount3: 9 },
          { id: '12987125', name: '王小虎', amount1: '621', amount2: '2.2', amount3: 17 },
          { id: '12987126', name: '王小虎', amount1: '539', amount2: '4.1', amount3: 15 }
        ],
        tableData2: [
          { date: '2016-05-03', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1518 弄', zip: 200333 },
          { date: '2016-05-02', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1518 弄', zip: 200333 },
          { date: '2016-05-04', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1518 弄', zip: 200333 },
          { date: '2016-05-01', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1518 弄', zip: 200333 },
          { date: '2016-05-08', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1518 弄', zip: 200333 },
          { date: '2016-05-06', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1518 弄', zip: 200333 },
          { date: '2016-05-07', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1518 弄', zip: 200333 }
        ],
        selectValue: '2',
        tableData4: [
          { date: '2016-05-03', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 28', zip: 200333, others: 0.364},
          { date: '2016-05-02', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 37', zip: 200333, others: 0.364 },
          { date: '2016-05-04', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 19', zip: 200333, others: 0.364 },
          { date: '2016-05-01', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 52', zip: 200333, others: 0.364 },
          { date: '2016-05-08', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 60', zip: 200333, others: 0.364 },
          { date: '2016-05-06', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 81', zip: 200333, others: 0.364 },
          { date: '2016-05-07', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 49', zip: 200333, others: 0.364 }
        ],
        tabHead: [
          {prop: 'name', label: '姓名'},
          {prop: '', label: '地址',
            childHead: [
              {prop: 'province', label: '省份'},
              {prop: 'city', label: '市区'},
              {prop: 'address', label: '地址'},
              {prop: 'zip', label: '邮编'},
              {prop: 'others', label: '其他'},
            ]
          },
          {prop: 'date', label: '日期'},
        ],
        thead: [],
        changeTable: false,
      }
    },
    mounted() {
      this.getActiveData();
    },
    methods: {
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex % 2 === 0) {
          if (columnIndex === 0) {
            return [1, 2];
          } else if (columnIndex === 1) {
            return [0, 0];
          }
        }
      },
      getActiveData() {
        const n = this.selectValue;
        this.changeTable = false;
        const list = [];
        for (let i = 0; i < this.tabHead.length ; i++) {
          let data = {
            prop: this.tabHead[i].prop,
            label: this.tabHead[i].label,
          };
          if(this.tabHead[i].childHead && this.tabHead[i].childHead.length>0){
            data['childHead'] = [];
            let arr = this.tabHead[i].childHead;
            for (let i = 0; i < arr.length ; i++) {
              if(i < parseInt(n)){
                data.childHead.push(arr[i]);
              }
            }
          }
          list.push(data);
        }
        this.thead = list;
        this.changeTable = true;
      },
      getIndex(row) {
        return (row.$index + 1)
      },
    }
  }
</script>

<style scoped lang="scss">
.mergeTable{
  padding: 20px;
  .line{
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
