<template>
  <div class="app-container">
  <el-form :inline="true"  class="demo-form-inline">
  <el-form-item label="">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="告警内容" v-model="listQuery.title">
      </el-input>
    </el-form-item>

    <el-form-item label="">
      <span class="demonstration">告警时间</span>
        <el-date-picker
          v-model="listQuery.timerange"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss" >
        </el-date-picker>
    </el-form-item>
    <el-form-item label="">
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </el-form-item>
  </el-form>

<el-table
    :key='tableKey' :data="list" v-loading="listLoading" stripe
    style="width: 100%">
    <el-table-column
      type="index"
      >
    </el-table-column>
    <el-table-column 
      label="告警内容"
      prop="alarm_desp">
    </el-table-column>
    <el-table-column width="200"
      label="时间"
      prop="add_time">
    </el-table-column>
  </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.curpage" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { fetchAlarmList } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'user',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        curpage: 1,
        pagesize: 10,
        name: '',
        title: '',
        timerange : ''
      },
      downloadLoading: false
    }
  },
  created() {
    this.logList()
  },
  methods: {
    logList(){
      this.listLoading = true
      fetchAlarmList(this.listQuery).then(response => {
        this.list = response.datas.alarm_list
        this.total = parseInt(response.datas.total_count)
        this.listLoading = false
        console.log(this.list)
      })
    },
    handleFilter() {
      this.listQuery.curpage = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pagesize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.curpage = val
      this.getList()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.filter-container{
  padding-top: 5px;
  .filter-item:first-child{
    width: 200px; 
    margin-left: 15px;
  }
}
table{
  width:100%;
  border-collapse:collapse;
}
table,th, td {
  border: 1px solid #ccc;
}
table .tableKey{
  width:15%;
  background-color:#f5f7fa;
}
table .tableValue{
  width:35%;
  color:#222;
  background-color:#e5f3ff;
}
.wasterTable .active {
  background-color: #9ce71a;
}

.filter-container {
    padding-top: 20px;
}



  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }


.app-container {
    height: 100%;
    padding: 20px;
}


  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 25%;
  }

</style>
