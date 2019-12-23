<template>
  <div class="app-container">
  <el-row>
  <el-col :span="8">
  <div type="flex" class="grid-content bg-purple"  justify="center">
    <pie-chart  type="flex" justify="center" :chartdata="datacollection"  :options="chartOptions" ></pie-chart>
  </div></el-col>
  <el-col :span="16">

  <div class="grid-content bg-purple-light">
  
    <el-form :inline="true"  class="demo-form-inline">

  <el-form-item label="船只在线日报">
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
      prop="state_online"
      label="在线">
    </el-table-column>
    <el-table-column
      prop="state_offline"
      label="离线">
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

  <el-form-item label="">
    <el-cascader
    :options="groupOptions"
    change-on-select
    v-model="listQuery.goupselection"
    @change="handleQueryChange">
  </el-cascader>

</el-form-item>
  <el-form-item label="">
      <el-input  @keyup.enter.native="handleQueryChange"  placeholder="船只名称"  v-model="listQuery.shipname"></el-input>
</el-form-item>


    <el-form-item label="">
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilterZaixianlv">{{$t('table.search')}}</el-button>
    </el-form-item>
    </el-form>


<el-table
      :data="shipList"
    stripe
    style="width: 100%">
    <el-table-column
      prop="GroupName"
      label="分组">
    </el-table-column>
    <el-table-column
      prop="ShipId"
      label="编号">
    </el-table-column>

    <el-table-column
      prop="ShipName"
      label="名称">
    </el-table-column>

    <el-table-column
      prop="onlineRate"
      label="在线率">
    </el-table-column>

    <el-table-column
      prop="ShipCompany"
      label="所属公司">
    </el-table-column>

  </el-table>

  <div class="pagination-container">
      <el-pagination background  :page-sizes="[5]"   @current-change="handleCurrentChange2" :current-page="query2.curpage" :page-size="query2.pagesize"  layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>


  </div>
</template>

<script>
import PieChart from './PieChart.js'
import { getRealTimeShipStat, getDayShipStat, fetchList, fetchGroupListForMap, getShipsOnlineRate } from '@/api/article'

  export default {
    components: {
      PieChart
    },
    data () {
      return {
        stat_loaded:true,
        datacollection: {
        labels: ['在线', '不在线'],
        datasets: [
          {
            backgroundColor: [
              '#41B883',
              '#E46651'
            ],
            data: [40, 20]
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
    shipList:[],
    areaStateOptions: [{ label: '所有', value: '0' }, { label: '在用', value: '1' }, { label: '暂停', value: '2' }, { label: '停用', value: '3' }, { label: '封闭', value: '4' }, { label: '闲置', value: '5' }, { label: '位移', value: '6' }, { label: '延期', value: '7' }],
    query1: {
          timerange : "",
          pagesize : 5
        },
    query2: {
          state : "",
          pagesize : 5
        },
    listQuery: {
        goupselection: [],
        groupid: 0,
        shipid: 0,
        shipname: ''
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
    groupOptions : [],

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
      this.getGroups()
      this.getShips()
    },
    methods: {
    handleQueryChange(value) {
      //this.showShipLatestTrail = false
      this.getShips()
    },
    getGroups() {
      this.listLoading = true
      fetchGroupListForMap().then(response => {
        this.groupOptions = response.datas.shipGroup
        this.listLoading = false
      })
    },
      fillData () {
        this.listLoading = true
        getRealTimeShipStat().then(response => {          
          this.datacollection.datasets[0].data = response.datas.ship
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
      handleFilterZaixianlv() {
        this.query2.curpage = 1
        this.getShips()
      },
      getShips() {
      this.listLoading = true
      this.listQuery.pagesize = 20
      getShipsOnlineRate(this.listQuery).then(response => {
        this.shipList = response.datas.shipList
        this.total = response.datas.shipcount
        this.listLoading = false
      })
    },
      handleFilter1 () {
        this.listLoading = true
        getDayShipStat(this.query1).then(response => {          
          this.dayStatList = response.datas.stat_list
          this.total_1 = response.datas.total_count
      })
      },
      handleCurrentChange(val) {
      this.query1.curpage = val
      this.handleFilter1()
    },
    handleCurrentChange2(val) {
      this.listQuery.curpage = val
      this.getShips()
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
  #zaixianlv{
  padding:30px;
  }
</style>