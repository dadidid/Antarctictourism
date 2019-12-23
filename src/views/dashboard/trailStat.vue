<template>
  <div class="app-container">
  <el-row>
  <el-col :span="24">
  <div type="flex" class="grid-content bg-purple"  justify="center">
    <line-chart  v-if="stat_loaded" type="flex" justify="center" :chartdata="datacollection"  :options="chartOptions" style="height='20px'"></line-chart>
  </div></el-col>
  </el-row>

<div id="zaixianlv">
  
   <el-form :inline="true"  class="demo-form-inline">

    <el-form-item label="">
      
      <el-date-picker
      v-model="listQuery.timerange"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>

    </el-form-item>

  <el-form-item>
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
  </el-form-item>
</el-form>

<el-table
     :data="list" v-loading="listLoading" stripe
    style="width: 100%">
    <el-table-column
      type="index"
      >
    </el-table-column>

    <el-table-column
      label="日期"
      prop="dataDate">
    </el-table-column>

    <el-table-column
      label="时间"
      prop="dataTime">
    </el-table-column>

    <el-table-column
      label="上报数量"
      prop="trail_number">
    </el-table-column>

    <el-table-column
      label="统计时间"
      prop="addTime">
    </el-table-column>

  </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.curpage" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

 </div>

  </div>
  
  </div>
</template>

<script>
import LineChart from './LineChart.js'
import { getRealTimeTrailStat, getRealTimeTrailReportStatList } from '@/api/article'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        stat_loaded:false,
        datacollection:  {
        labels: ['在用', '暂停', '停用', '封闭', '闲置', '位移'],
        datasets: [
          {
            label: '轨迹上报实时统计',
            backgroundColor: '#409EFF',
            data: [40, 20, 11, 22, 33, 1]
          }
        ]
      },
      chartOptions: {
      responsive: true,
      maintainAspectRatio: false
    },
    total:0,
    total_1:0,
    total_2:0,
    listLoading: true,
    listQuery: {
        curpage: 1,
        pagesize: 20,
        groupid: '',
        shipname: '',
        captain: '',
        equipid: '',
        companyname: ''
      },
    query1: {
          timerange : "",
          pagesize : 5
        },
    query2: {
          state : "",
          pagesize : 10
        },
    list: [],
    dayStatList : [{
    dataDate:'',
    type: '', 
    state_use : 0, 
    state_pause : 0, 
    state_stop : 0, 
    state_close : 0, 
    state_desert : 0, 
    state_moved : 0, 
    addtime : ''
    }],

     dayStatList2 : [{
    dataDate:'',
    type: '', 
    state_use : 0, 
    state_pause : 0, 
    state_stop : 0, 
    state_close : 0, 
    state_desert : 0, 
    state_moved : 0, 
     }],
         
      }
    },
    async mounted () {
      this.fillData()
      this.handleFilter()
    },
    methods: {
      fillData () {
        this.listLoading = true
        getRealTimeTrailStat().then(response => {          
          this.datacollection.labels = response.datas.dataTime
          this.datacollection.datasets[0].data = response.datas.trail_number
          this.stat_loaded = true
          this.listLoading = false
      })
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
      getList() {
      this.listLoading = true
      fetchList(this.query2).then(response => {
        this.list = response.datas.area_list
        this.total = parseInt(response.datas.total_count)
        this.listLoading = false
      })
    },
      handleFilter () {
        this.listQuery.curpage = 1
        this.getList()
      },
      getList() {
        this.listLoading = true
        getRealTimeTrailReportStatList(this.listQuery).then(response => {
          console.log(response)
          this.list = response.datas.trailList || []
          this.total = parseInt(response.datas.total_count)
          this.listLoading = false
        })
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

<style scoped>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
  .grid-content{
  padding: 30px;
  max-height:100px;
  }
  #line-chart{
  height:300px !important;
  width:100% !important;
  }
  #qfqtable{
  height:280px;
  }
  .el-row {
  height:450px;
  }

  .filter-container {
    padding-top: 20px;
}


.app-container {
    height: 100%;
    padding: 20px;
}

</style>