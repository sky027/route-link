<template>
  <div class="treeTable">
    <search-table
      ref="searchTable"
      :form="searchData"
      :is-feed="false"
      :table-config="tableConfig">
      <!--查询-->
      <template slot="searchForm">
        <el-form v-model="searchData" :inline="true">
          <el-form-item label="菜单名称：">
            <el-input v-model="searchData.name" :clearable="true" placeholder="请输入菜单名称" />
          </el-form-item>
        </el-form>
      </template>
      <!--列表中按钮-->
      <template slot="tableOperator" slot-scope="scope">
        <el-button type="primary" size="mini" icon="el-icon-plus" plain @click="addChildMenu(scope)"> 添加子级 </el-button>
        <el-button type="primary" size="mini" icon="el-icon-edit" plain @click="editMenu(scope)"> 编辑 </el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete" plain @click="deleteMenu(scope)"> 删除 </el-button>
      </template>
    </search-table>
  </div>
</template>

<script>

  export default {
    name: 'treeTable',
    data() {
      return {
        searchData: {
          name: '',
          pageNumber: 1,
          pageSize: 100
        },
        tableConfig: {
          requestUrl: '/tree/list',
          topOperate: false,
          isPagination: false,
          isTreeTable: true,
          columnConfig: [
            { prop: 'name', label: '菜单名称' },
            { prop: 'url', label: 'URL' },
            { prop: 'sortNo', label: '排序' },
            { prop: 'visible', label: '是否显示',
              formatter: (row) => {
                if (row.visible === '1') {
                  return <template slot="visible">是</template>
                } else {
                  return <template slot="visible">否</template>
                }
              }
            },
            { prop: 'routeKey', label: '菜单标识' },
            { prop: 'operator', label: '操作', width: '319' }
          ]
        }
      }
    },
    methods: {
      // 添加子级
      addChildMenu(scope) {
        this.$message.success('添加子级')
      },
      // 编辑
      editMenu(scope) {
        this.$message.success('编辑')
      },
      // 删除
      deleteMenu(scope) {
        this.$confirm('确认删除该菜单及其子级菜单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message.success('删除成功')
          this.$refs.searchTable.handleSearch()
        }).catch(reason => {
          this.$message.error('删除失败')
        })
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
