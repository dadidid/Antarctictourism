<template>
  <div class="app-container">
  <el-row>
  <el-col :span="8">
  <div type="flex" class="grid-content bg-purple"  justify="center">
    <bar-chart  key="41" type="flex" justify="center" :chartdata="datacollection"  :options="chartOptions" style="height='20px'"></bar-chart>
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
      >
    </el-date-picker>
    </el-form-item>
    <el-form-item label="">
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
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
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
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




<el-row>
  <el-col :span="8">
  <div type="flex" class="grid-content bg-purple"  justify="center">
    <bar-chart  key="43" type="flex" justify="center" :chartdata="datacollection"  :options="chartOptions" style="height='20px'"></bar-chart>
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
      >
    </el-date-picker>
    </el-form-item>
    <el-form-item label="">
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
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
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
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

  export default {
    components: {
      BarChart
    },
    data () {
      return {
        datacollection:  {
        labels: ['在用', '暂停', '停用', '封闭', '闲置', '位移'],
        datasets: [
          {
            label: '倾废区实时统计',
            backgroundColor: '#409EFF',
            data: [40, 20, 11, 22, 33, 22]
          }
        ]
      },
      chartOptions: {
      responsive: true,
      maintainAspectRatio: false
    },
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
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {

      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
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