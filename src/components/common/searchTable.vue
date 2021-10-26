<template>
  <div class="searchTable">
    <div v-if="form" class="table-search">
      <slot name="searchForm"></slot>
      <div v-if="!tableConfig.isNotSearch" :class="isFeed ? 'btn-box' : 'lineFeed'">
        <el-button type="primary" @click="handleSearch()">查询</el-button>
      </div>
    </div>
    <div v-if="tableConfig.topOperate" class="tab-operator">
      <slot name="operatorTemp"></slot>
    </div>
    <div v-if="!tableConfig.isTreeTable" class="tab-box">
      <!--普通列表-->
      <el-table
        ref="searchTable"
        :data="tableData"
        :loading="listLoading"
        element-loading-text="Loading"
        highlight-current-row
        class="table temp-table"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column v-if="tableConfig.isIndex" label="序号" type="index" width="55">
          <template slot-scope="scope">
            {{(scope.$index + 1) + pagination.pageSize * (pagination.pageNumber - 1)}}
          </template>
        </el-table-column>
        <el-table-column v-if="!tableConfig.isIndex && !tableConfig.isRadio" type="selection" width="55"></el-table-column>
        <el-table-column v-if="tableConfig.isRadio" width="55">
          <template slot-scope="scope">
            <el-radio :label="scope.row.id" v-model="templateRadio" @change.native="getTemplateRow(scope.$index, scope.row)">&nbsp</el-radio>
          </template>
        </el-table-column>
        <template v-for="(item, index) in tableConfig.columnConfig">
          <template v-if="item.isSlot">
            <el-table-column
              :key="index"
              :formatter="item.formatter"
              :width="item.width"
              :sortable="item.isSort"
              :prop="item.prop"
              :label="item.label">
              <template slot-scope="scope">
                  <slot v-if="item.isSlot" :name="item.prop" :row="scope.row" />
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column
              v-if="item.prop !== 'operator'"
              :key="index"
              :formatter="item.formatter"
              :width="item.width"
              :sortable="item.isSort"
              :prop="item.prop"
              :label="item.label">
              <!--<slot v-if="item.formatter" :name="item.prop" v-html="item.formatter"></slot>-->
            </el-table-column>
            <el-table-column
              v-if="item.prop === 'operator'"
              :key="index"
              :fixed="item.fixed"
              :width="item.width"
              :prop="item.prop"
              :label="item.label"
              class="operator">
              <template slot-scope="scope">
                <slot name="tableOperator" :row="scope.row" />
              </template>
            </el-table-column>
          </template>
        </template>
      </el-table>
      <el-pagination
        v-if="tableConfig.isPagination && total > 0"
        class="tab-pagination"
        :current-page="pagination.pageNumber"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagination.pageSize"
        layout="total, prev, pager, next, sizes"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <div v-if="tableConfig.isTreeTable" class="tab-box">
      <!--树形列表-->
      <el-table
        :data="tableData"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        :loading="listLoading"
        element-loading-text="Loading"
        row-key="id"
        highlight-current-row
        class="table temp-table"
        border>
        <template v-for="(item, index) in tableConfig.columnConfig">
          <el-table-column
            v-if="item.prop !== 'operator'"
            :key="index"
            :formatter="item.formatter"
            :width="item.width"
            :sortable="item.isSort"
            :prop="item.prop"
            :label="item.label">
          </el-table-column>
          <el-table-column
            v-if="item.prop === 'operator'"
            :key="index"
            :width="item.width"
            :prop="item.prop"
            :label="item.label">
            <template slot-scope="scope">
              <slot name="tableOperator" :row="scope.row"></slot>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
import CommonUtil from '@/utils/commonUtil'

/**
 * tableConfig 属性说明
 *  requestUrl  String 数据请求接口路径
 *  isNotSearch  Boolean  是否需要查询栏
 *  isIndex  Boolean  是否需要显示序号
 *  isRadio  Boolean  是否是单选， true为单选 false多选，默认多选
 *  topOperate  Boolean 是否需要列表上方操作按钮
 *  isPagination  Boolean  是否需要分页器
 *  isTreeTable  Boolean  是否是树形结构列表
 *  columnConfig  列配置
 *  ---------------------------------------------
 *  columnConfig  属性说明
 *  prop  String  关联数据字段名
 *  label  String  列名 表头
 *  width  Number  列宽
 *  fixed  String  列固定位置 left/right
 *  isSort  Boolean  是否需要排序
 *  isSlot  Boolean  是否需要模板插槽，用来处理文字样式、单元格内容点击、单元格插入自定义内容等
 *  formatter  Function  用来转换字段显示内容，例如类型转换，时间转换等
 */
export default {
  name: 'SearchTable',
  props: {
    tableConfig: {
      type: Object,
      default() {
        return {}
      }
    },
    isFeed: {
      type: Boolean,
      default: true
    },
    form: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      pagination: {
        pageNumber: 1,
        pageSize: 10
      },
      total: 0,
      templateRadio: '',
      selectData: [],
      listLoading: false,
      tableData: [],
      tableDataAll: []
    }
  },
  created() {
     const len = Math.floor(Math.random() * 350) + 50
     for (let i = 0; i < len; i++) {
      this.tableDataAll.push({
        id: Math.floor(Math.random() * 9000) + 1000,
        userName: 'A ' + (Math.floor(Math.random() * 9000) + 1000),
        name: 'B ' + (Math.floor(Math.random() * 9000) + 1000),
        other: 'C ' + (Math.floor(Math.random() * 9000) + 1000),
        phone: '136236569862',
        roleType: (i % 2) === 0 ? '2' : '1',
        userStatus: (i % 2) === 0 ? '1' : '2',
        creatTime: '2021-09-16 14:32:49',
        organ: '机构 ' + (Math.floor(Math.random() * 9000) + 1000),
        desc: '这是说明'
      })
    }
     if (this.tableConfig.selectDataId && this.tableConfig.selectDataId.length && this.tableConfig.isRadio) {
       this.templateRadio = this.tableConfig.selectDataId[0]
     }
    this.handleSearch()
  },
  methods: {
    handleSearch(index) {
      const that = this
      this.listLoading = true
      if (!index) {
        this.pagination.pageNumber = 1
      }
      let param = CommonUtil.deepClone(this.form)
      if (this.tableConfig.isPagination) {
        param = Object.assign(param, this.pagination)
      }
      if (this.tableConfig.requestUrl === '/mock/list') {
        this.tableData = this.tableDataAll.slice((this.pagination.pageNumber - 1) * this.pagination.pageSize, this.pagination.pageNumber * this.pagination.pageSize)
        this.total = this.tableDataAll.length
        setTimeout(() => {
          that.setTitle()
          this.listLoading = false
        }, 700)
        return
      }
      this.$request.post(this.tableConfig.requestUrl, param, (result) => {
        if (result && result.returnCode === '1000') {
          if (this.tableConfig.isTreeTable) {
            this.checkTreeList(result.dataInfo || result.records)
            // console.log('递归后', result.dataInfo || result.records)
            this.tableData = result.dataInfo || result.records
          } else {
            this.tableData = result.records
          }
          this.total = parseInt(result.total)
          setTimeout(() => {
            that.setTitle()
          }, 500)
          this.listLoading = false
        } else {
          this.resetParam()
        }
      }, (error) => {
        console.log(error)
        this.listLoading = false
      })
    },
    // 树形数据递归
    checkTreeList(list) {
      list.forEach(item => {
        item.isChecked = item.roleId && item.roleId.length
        if (item.children && item.children.length) {
          this.checkTreeList(item.children)
        }
      })
    },
    // 重置
    resetParam() {
      this.pagination.pageNumber = 1
      this.pagination.pageSize = 10
      this.tableData = []
      this.total = 0
    },
    // 勾选数据
    handleSelectionChange(rows) {
      this.selectData = []
      this.selectData = rows
    },
    // 改变每页大小
    handleSizeChange(val) {
      this.pagination.pageNumber = 1
      this.pagination.pageSize = val
      this.handleSearch()
    },
    // 点击翻页
    handleCurrentChange(val) {
      this.pagination.pageNumber = val
      this.handleSearch(val)
    },
    // 添加title
    setTitle() {
      var tr = document.getElementsByClassName('el-table__body')[0].querySelectorAll('.el-table__row')
      for (var i = 0, len = tr.length; i < len; i++) {
        var td = tr[i].querySelectorAll('.cell')
        for (var k = 0, n = td.length; k < n; k++) {
          var dom = td[k]
          if (td[k].getElementsByClassName('el-button').length === 0) {
            dom.title = dom.innerText
          }
        }
      }
    },
    // 单选
    getTemplateRow(index, row) {
      this.selectData = []
      this.selectData.push(row)
    },
    // 回显状态
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.searchTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.searchTable.clearSelection();
      }
    }
  }
}
</script>

<style scoped lang="scss">
.searchTable{
  .table-search{
    padding: 20px 15px;
    position: relative;
    /deep/ .el-form-item__label{
      padding: 0;
      width: 80px;
      text-align: right;
    }
    /deep/ .big-width{
      .el-form-item__label {
        width: 105px;
      }
    }
    .btn-box{
      padding-right: 30px;
      text-align: right;
    }
    .lineFeed{
      position: absolute;
      top: 20px;
      right: 30px;
    }
  }
  .tab-operator{
    padding: 0 15px 20px 15px;
  }
  .tab-box{
    padding: 0 15px;
    .table {
      border: 1px solid #e6ebf5;
      border-bottom: none;
    }
  }
}
</style>
