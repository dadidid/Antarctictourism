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



<div id="zaixianlv">
  
    <el-form :inline="true"  class="demo-form-inline">

  <el-form-item label="倾废区列表">
    <span class="demonstration"></span>

      <el-select  @change='handleFilter' placeholder="状态" v-model="query2.state">
        <el-option v-for="item in  areaStateOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
      </el-select>

    </el-form-item>
    <el-form-item label="">
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </el-form-item>
    </el-form>


<el-table
      :data="list"
    stripe
    style="width: 100%">
    <el-table-column
      prop="AreaCode"
      label="编码">
    </el-table-column>
    <el-table-column
      prop="AreaDistrict"
      label="管理局">
    </el-table-column>

    <el-table-column
      prop="AreaName"
      label="名称">
    </el-table-column>

    <el-table-column
      prop="AreaType"
      label="类型">
    </el-table-column>

    <el-table-column
      prop="AreaInUseDesc"
      label="状态">
    </el-table-column>

    <el-table-column
      prop="Region"
      label="地区">
    </el-table-column>

    <el-table-column
      prop="WasteType"
      label="废弃物类型">
    </el-table-column>

    <el-table-column
      prop="ActiveTime"
      label="开始时间">
    </el-table-column>

    <el-table-column
      prop="CloseTime"
      label="关闭时间">
    </el-table-column>


    <el-table-column
      prop="AreaExten"
      label="延期">
    </el-table-column>

    

  </el-table>

  <div class="pagination-container">
      <el-pagination background  :page-sizes="[10,20]"   @current-change="handleCurrentChange2" :current-page="query2.curpage" :page-size="query2.pagesize"  layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
 </div>

  </div>
  
  </div>
</template>

<script>
import BarChart from './BarChart.js'
import { getRealTimeQfqStat, getDayQfqStat, fetchList } from '@/api/article'

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
    total_2:0,
    areaStateOptions: [{ label: '所有', value: '0' }, { label: '在用', value: '1' }, { label: '暂停', value: '2' }, { label: '停用', value: '3' }, { label: '封闭', value: '4' }, { label: '闲置', value: '5' }, { label: '位移', value: '6' }, { label: '延期', value: '7' }],
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
      this.handleFilter1()
      this.handleFilter()
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
      getList() {
      this.listLoading = true
      fetchList(this.query2).then(response => {
        this.list = response.datas.area_list
        this.total = parseInt(response.datas.total_count)
        this.listLoading = false
      })
    },
      handleFilter () {
        this.query2.curpage = 1
        this.getList()
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
    handleCurrentChange2(val) {
      this.query2.curpage = val
      this.handleFilter()
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
  .el-row {
  height:450px;
  }
</style>