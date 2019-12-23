<template>
  <div class="app-container">
  <el-row>
  <el-col :span="8">
  <div type="flex" class="grid-content bg-purple"  justify="center">
    <bar-chart  v-if="stat_loaded" type="flex" justify="center" :chartdata="datacollection"  :options="chartOptions" style="height='20px'"></bar-chart>
  </div></el-col>
  <el-col :span="16">

  <div class="grid-content bg-purple-light">
  
    <el-form :inline="true"  class="demo-form-inline">

  <el-form-item label="倾废区日报">
    <span class="demonstration">日期</span>
     <el-date-picker
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      v-model = "query1.timerange"
      value-format = "yyyy-MM-dd"
      >
    </el-date-picker>
    </el-form-item>
    <el-form-item label="">
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter1">{{$t('table.search')}}</el-button>
    </el-form-item>
    </el-form>

<el-table id="qfqtable"
    :data="dayStatList"
    stripe
    style="width: 100%">
    <el-table-column
      prop="dataDate"
      label="日期">
    </el-table-column>
    <el-table-column
      prop="state_use"
      label="在用">
    </el-table-column>
    <el-table-column
      prop="state_pause"
      label="暂停">
    </el-table-column>
    <el-table-column
      prop="state_stop"
      label="停用">
    </el-table-column>
    <el-table-column
      prop="state_close"
      label="封闭">
    </el-table-column>

    <el-table-column
      prop="state_desert"
      label="闲置">
    </el-table-column>

    <el-table-column
      prop="state_moved"
      label="位移">
    </el-table-column>

    <el-table-column
      prop="addTime" width=250
      label="生成时间">
    </el-table-column>

  </el-table>

  <div class="pagination-container">
      <el-pagination background  :page-sizes="[5]"  @current-change="handleCurrentChange" :current-page="query1.curpage" :page-size="query1.pagesize"  layout="total, sizes, prev, pager, next, jumper" :total="total_1">
      </el-pagination>
    </div>


  </div></el-col>
  </el-row>



<el-row>
  
  <el-col :span="24">

  <div class="grid-content bg-purple-light">
  
    <el-form :inline="true"  class="demo-form-inline">

  <el-form-item label="船只在线率日报">
    <span class="demonstration">日期</span>
     <el-date-picker
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      >
    </el-date-picker>
    </el-form-item>
    <el-form-item label="">
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </el-form-item>
    </el-form>


<el-table id="qfqtable"
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期">
    </el-table-column>
    <el-table-column
      prop="name"
      label="在用">
    </el-table-column>

    <el-table-column
      prop="name"
      label="暂停">
    </el-table-column>

    <el-table-column
      prop="name"
      label="停用">
    </el-table-column>

    <el-table-column
      prop="name"
      label="封闭">
    </el-table-column>

    <el-table-column
      prop="name"
      label="闲置">
    </el-table-column>

    <el-table-column
      prop="name"
      label="位移">
    </el-table-column>
  </el-table>

  <div class="pagination-container">
      <el-pagination background  :page-sizes="[10,20,30, 50]"  layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div></el-col>
  </el-row>
  
  </div>
</template>

<script>
import BarChart from './BarChart.js'
import { getRealTimeQfqStat, getDayQfqStat } from '@/api/article'

  export default {
    components: {
      BarChart
    },
    data () {
      return {
        stat_loaded:false,
        datacollection:  {
        labels: ['在用', '暂停', '停用', '封闭', '闲置', '位移'],
        statDat : [],
        datasets: [
          {
            label: '倾废区实时统计',
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
    query1: {
          timerange : "",
          pagesize : 5
        },
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
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    async mounted () {
      this.fillData()
      this.handleFilter1()
    },
    methods: {
      fillData () {
        this.listLoading = true
        getRealTimeQfqStat().then(response => {          
          this.datacollection.datasets[0].data = response.datas.qfq
          this.stat_loaded = true
          this.listLoading = false
      })
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
      handleFilter () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
      handleFilter1 () {
        this.listLoading = true
        getDayQfqStat(this.query1).then(response => {          
          this.dayStatList = response.datas.stat_list
          this.total_1 = response.datas.total_count
      })

      },
      handleCurrentChange(val) {
      this.query1.curpage = val
      this.handleFilter1()
    },
    }
  }
</script>

<style>
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
  .el-row{
  height:450px;
  }
</style>