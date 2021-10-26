<template>
  <div class="paramConfig">
    <search-table
      ref="searchTable"
      :form="searchData"
      :isFeed="false"
      :table-config="tableConfig">
      <!--查询-->
      <template slot="searchForm">
        <el-form v-model="searchData" :inline='true'>
          <el-form-item label="配置名称：">
            <el-input v-model.trim="searchData.configName" clearable placeholder="请输入配置名称" />
          </el-form-item>
          <el-form-item label="参数标识：">
            <el-select v-model="searchData.configKey" clearable placeholder="请选择参数标识">
              <el-option label="人脸识别" value="face_check" />
              <el-option label="短信验证" value="sms_check" />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <!--上方按钮-->
      <template slot="operatorTemp">
        <el-button type="primary" icon="el-icon-plus" @click="addConfig">新增</el-button>
        <el-button type="primary" icon="el-icon-upload2" @click="exportData">导出</el-button>
      </template>
      <!--列表中按钮-->
      <template slot="tableOperator" slot-scope="scope">
        <el-button type="primary" size="mini" icon="el-icon-edit" plain @click.native.prevent="editConfig(scope)"> 修改 </el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete" plain @click.native.prevent="deleteConfig(scope)"> 删除 </el-button>
      </template>
    </search-table>
  </div>
</template>

<script>
  import CommonUtil from "@/utils/commonUtil";

  export default {
    name: "NormalTable",
    data() {
      return {
        searchData: {
          configName: '',
          provinceCode: '',
          configKey: ''
        },
        tableConfig: {
          requestUrl: '/normal/list',
          isIndex: true,
          topOperate: true,
          isPagination: true,
          columnConfig: [
            { prop: 'userName', label: '配置名称' },
            { prop: 'other', label: '功能分类' },
            { prop: 'name', label: '所属省份' },
            { prop: 'roleType', label: '参数标识' },
            { prop: 'id', label: '参数值'},
            { prop: 'operator', label: '操作', width: '200' }
          ]
        },
        cities: []
      }
    },
    methods: {
      addConfig() {
        this.$message.success('新增');
      },
      // 导出
      exportData() {
        this.$message.success('导出');
      },
      // 删除
      deleteConfig(data) {
        this.$confirm('删除当前配置的省份登录方式，该省将无法使用当前登录方式登录和装维APP,确定删除改配置？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message.success('删除成功')
          this.$refs.searchTable.handleSearch()
        }).catch(r => {
          this.$message.error('删除失败')
        })
      },
      editConfig() {
        this.$message.success('编辑');
      }
    }
  }
</script>

<style scoped>

</style>
