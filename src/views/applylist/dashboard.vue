<template>
  <div class="app-container">
    <el-row>
    <el-col :span="12">
  <div type="flex" class="grid-content bg-purple"  justify="center">
    <line-chart  v-if="stat_loaded4" type="flex" justify="center" :chartdata="datacollection2"  :options="chartOptions2" style="height='20px'"></line-chart>
  </div>
  </el-col>

  <el-col :span="12">
  <div type="flex" class="grid-content bg-purple"  justify="center">
    <line-chart  v-if="stat_loaded2" type="flex" justify="center" :chartdata="datacollection1"  :options="chartOptions1" style="height='20px'"></line-chart>
  </div>
  </el-col>
  </el-row>
  <el-row>
   <el-col :span="12">
  <div type="flex" class="grid-content bg-purple"  justify="center">
    <pie-chart  v-if="stat_loaded3" type="flex" justify="center" :chartdata="peidatacollection"  :options="peichartOptions" ></pie-chart>
  </div>
  </el-col>
  <el-col :span="12">
  <div type="flex" class="grid-content bg-purple"  justify="center">
    <pie-chart  v-if="stat_loaded1" type="flex" justify="center" :chartdata="peidatacollectionc"  :options="peichartOptionsc" ></pie-chart>
  </div>
  </el-col>
  </el-row>
  
 </div>
</template>

<script>
import LineChart from './LineChart.js'
import PieChart from './PieChart.js'
import { getRealTimeTrailStat, getRealTimeTrailReportStatList,
 getRealTimeBalance,getRealTimeOrder,
 getDayOrder,getDayTourist} from '@/api/article'

  export default {
    components: {
      LineChart,
      PieChart
    },
    data () {
      return {
        stat_loaded1:false,
        stat_loaded2:false,
        stat_loaded3:false,
        stat_loaded4:false,
    datacollection1:  {
        labels: ['在用', '暂停', '停用', '封闭', '闲置', '位移'],
        datasets: [
          {
            label: '单日新增订单数量',
            backgroundColor: '#409EFF',
            data: [40, 20, 11, 22, 33, 1]
          }
        ]
      },
    chartOptions1: {
      responsive: true,
      maintainAspectRatio: false
    },
    datacollection2:  {
        labels: ['在用', '暂停', '停用', '封闭', '闲置', '位移'],
        datasets: [
          {
            label: '单日新增游客数量',
            backgroundColor: '#409EFF',
            data: [40, 20, 11, 22, 33, 1]
          }
        ]
      },
    chartOptions2: {
      responsive: true,
      maintainAspectRatio: false
    },
    peidatacollection:  {
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
      peichartOptions: {
      responsive: true,
      maintainAspectRatio: false
    },
    peidatacollectionc:  {
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
      peichartOptionsc: {
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
    // created() {
    //     this.fillData()
    // },
    methods: {
      fillData () {
        // this.listLoading = true
        //获取成交金額饼状图
        getRealTimeBalance().then(response => {    
            this.peidatacollection.labels =response.datas.labels;
            this.peidatacollection.datasets[0].backgroundColor =response.datas.bgcolor;
            this.peidatacollection.datasets[0].data =response.datas.datas;
            console.log(this.peidatacollection)
        //   this.datacollection.labels = response.datas.dataTime
        //   this.datacollection.datasets[0].data = response.datas.trail_number
             this.stat_loaded3 = true
        //   this.listLoading = false
      })
      //获取订单状态饼状图
       getRealTimeOrder().then(response => {    
            this.peidatacollectionc.labels =response.datas.labels;
            this.peidatacollectionc.datasets[0].backgroundColor =response.datas.bgcolor;
            this.peidatacollectionc.datasets[0].data =response.datas.datas;
            console.log(this.peidatacollectionc)
        //   this.datacollection.labels = response.datas.dataTime
        //   this.datacollection.datasets[0].data = response.datas.trail_number
             this.stat_loaded1 = true
        //   this.listLoading = false
      })
      //获取订单日报折线图
       getDayOrder().then(response => {   
           console.log("订单",) 
            this.datacollection1.labels =response.datas.labels;
            this.datacollection1.datasets[0].data =response.datas.datas;
            console.log(this.peidatacollection)
        //   this.datacollection.labels = response.datas.dataTime
        //   this.datacollection.datasets[0].data = response.datas.trail_number
             this.stat_loaded2 = true
        //   this.listLoading = false
      })
      //获取游客日报折线图
       getDayTourist().then(response => {    
            this.datacollection2.labels =response.datas.labels;
            this.datacollection2.datasets[0].data =response.datas.datas;
        //   this.datacollection.labels = response.datas.dataTime
        //   this.datacollection.datasets[0].data = response.datas.trail_number
             this.stat_loaded4 = true
        //   this.listLoading = false
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