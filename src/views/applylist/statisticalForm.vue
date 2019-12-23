<template>
  <div class="app-container">
      <el-row>
        <el-col :span="12">
          <el-form :inline="true" class="demo-form-inline">
        <el-form-item label>
          <el-select v-model="listQuery1.companyId" clearable placeholder="请选择"
          filterable
          >
            <el-option v-for="item in companyUpperApplyList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              >
            </el-option>
          </el-select>
          
        </el-form-item>
        <el-form-item label>
          <el-date-picker v-model="listQuery1.start" type="date" placeholder="开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label>
          <el-date-picker v-model="listQuery1.end" type="date" placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            class="filter-item"
            type="primary"
            v-waves
            icon="el-icon-search"
            @click="handleFilterOne"
          >{{$t('table.search')}}</el-button>
           <el-button
            class="filter-item"
            type="primary"
            v-waves
            icon="el-icon-notebook-2"
            @click="handleDownload"
          >导出报表</el-button>
        </el-form-item>
        
      </el-form>
      <el-table
      :data="Type1BalanceList"
      v-loading="listLoading"
      stripe
    >
      <el-table-column label="日期" prop="statMonth"></el-table-column>
      <el-table-column label="上游公司" prop="companyName"></el-table-column>
      <el-table-column label="余款" prop="balance"></el-table-column>
      <el-table-column label="单位" prop="unitType"></el-table-column>   
    </el-table>
      <el-pagination
        background
        @size-change="handleSizeChangeOne"
        @current-change="handleCurrentChangeOne"
        :current-page="listQuery1.curpage"
        :page-sizes="[10,20,30,40,50]"
        :page-size="listQuery1.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalOne"
      ></el-pagination>
        </el-col>
        <el-col :span="12" style="padding-left:20px;">
          <el-form :inline="true" class="demo-form-inline" >
        <el-form-item label>
          <el-select v-model="listQuery2.companyId" clearable placeholder="请选择"
          filterable>
            <el-option v-for="item in companyDownnerApplyList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label>
          <el-date-picker v-model="listQuery2.start" type="date" placeholder="开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label>
          <el-date-picker v-model="listQuery2.end" type="date" placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            class="filter-item"
            type="primary"
            v-waves
            icon="el-icon-search"
            @click="handleFilterTwo"
          >{{$t('table.search')}}</el-button>
          <el-button
            class="filter-item"
            type="primary"
            v-waves
            icon="el-icon-notebook-2"
            @click="handleUpperload"
          >导出报表</el-button>
        </el-form-item>
      </el-form>
      <el-table
      :data="Type2BalanceList"
      v-loading="listLoading"
      stripe
    >
      <el-table-column label="日期" prop="statMonth"></el-table-column>
      <el-table-column label="下游公司" prop="companyName"></el-table-column>
      <el-table-column label="余款" prop="balance"></el-table-column>
      <el-table-column label="单位" prop="unitType"></el-table-column>   
    </el-table>
      <el-pagination
        background
        @size-change="handleSizeChangeTwo"
        @current-change="handleCurrentChangeTwo"
        :current-page="listQuery2.curpage"
        :page-sizes="[10,20,30,40,50]"
        :page-size="listQuery2.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalTwo"
      ></el-pagination>
        </el-col>
      </el-row>

  </div>
</template>
<script>
import {
  getUpperCompanyList,
  getBalanceStatList,
  getDownnerUserList
} from "@/api/article";

import waves from "@/directive/waves"; // 水波纹指令
import { parseTime } from "@/utils";
import lang from "@/lang";

export default {
  name: "ship",
  directives: {
    waves
  },
  data() {
    return {
       listQuery:{
        pagesize:10,
        curpage:1,
        name:"",
      },
      dialogFormVisible: false,
      listQuery1: {
        type:"1",
        companyId: "",
        start: "",
        end: "",
        curpage: 1,
        pagesize: 10
      },
      listQuery2: {
        type:"2",
        companyId: "",
        start: "",
        end: "",
        curpage: 1,
        pagesize: 10
      },
      Type1BalanceList:[],
      Type2BalanceList:[],
      companyUpperApplyList:[],
      companyDownnerApplyList:[],
      listLoading: true,
      totalOne: 0,
      totalTwo:0,
      uList:[],
      dList:[],
    };
  },
  filters: {
  },
  created() {
    // this.getList();
    this.listLoading = false;//图标加载
    this.getTypeOneList();
    this.getTypeTwoList();
    this.getUpperCompanyList();
    this.getDownnerCompanyList();
    this.getAllInfo();
  },
  methods: {
    getAllInfo(){
      this.listQuery1.pagesize = 2000;
      this.listQuery2.pagesize = 2000;
      getBalanceStatList(this.listQuery1).then(res=>{
          this.uList = res.datas.list;
          // console.log(this.uList)
      });
      getBalanceStatList(this.listQuery2).then(response => {
        this.dList = response.datas.list || [];   
      });
      this.listQuery1.pagesize = 10;
      this.listQuery2.pagesize = 10;
    },
    //导出上游公司报表
    handleDownload() {
      this.downloadLoading = true;
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['日期','上游公司','余款','单位']
        const filterVal = ['statMonth','companyName', 'balance','unitType']
        const data = this.formatJson(filterVal, this.uList)
        console.log(data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '上游公司报表'
        })
        this.downloadLoading = false
      })
   
    },
      //导出下游公司报表
    handleUpperload() {
      this.downloadLoading = true;
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['日期','下游公司','余款','单位']
        const filterVal = ['statMonth','companyName', 'balance','unitType']
        const data = this.formatJson(filterVal, this.dList)
        console.log(data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '下游公司报表'
        })
        this.downloadLoading = false
      })
   
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
          return v[j]
      }))
    },
    //上游公司接口
    getUpperCompanyList() {
      this.listLoading = true //加载图标
      getUpperCompanyList(this.listQuery).then(response => {    
        // console.log(response)
        this.companyUpperApplyList = response.datas.list || [];    
        this.listLoading =false;
      });
    },
    //下游公司接口
     getDownnerCompanyList() {
      this.listLoading = true //加载图标
      getDownnerUserList(this.listQuery).then(response => {
        this.companyDownnerApplyList = response.datas.list || [];   
        this.listLoading =false;
      });
    },
    getTypeOneList(){
      getBalanceStatList(this.listQuery1).then(res=>{
          console.log(res)
          this.totalOne = parseInt(res.datas.total_count)
          this.Type1BalanceList = res.datas.list;
          console.log(this.Type1BalanceList)
      })
    },
     getTypeTwoList(){
      getBalanceStatList(this.listQuery2).then(res=>{
          this.totalTwo = parseInt(res.datas.total_count)
          this.Type2BalanceList = res.datas.list;
          console.log(this.Type2BalanceList)
      })
    },
    handleFilterOne() {
      this.getTypeOneList();
    },
    handleFilterTwo() {
      this.getTypeTwoList();
    },
    handleSizeChangeOne(val) {
      this.listQuery1.pagesize = val;
      this.getTypeOneList();
    },
    handleCurrentChangeOne(val) {
      this.listQuery1.curpage = val;
      this.getTypeOneList();
    },
    handleSizeChangeTwo(val) {
      this.listQuery2.pagesize = val;
      this.getTypeTwoList();
    },
    handleCurrentChangeTwo(val) {
      this.listQuery2.curpage = val;
      this.getTypeTwoList();
    },
    hasPermission(actionId) {
      const group = this.$store.getters.admingroupid;
      if (group == 1) return true;
      return false;
    },
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.filter-container {
  padding-top: 20px;
}

.app-container {
  height: 100%;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}
table,
th,
td {
  border: 1px solid #ccc;
}
table .tableKey {
  width: 17%;
  background-color: #f5f7fa;
}
table .tableValue {
  width: 17%;
  color: #222;
  background-color: #e5f3ff;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>


<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 25%;
}

.table_1_column_12 .cell {
  min-width: 120px !important;
}

.imagelist {
  width: 200px;
  height: 150px;
  margin-right: 10px;
}
.el-button el-button--info el-button--mini{
  margin-left: 2px;
}
.el-col .el-col-12{
  margin-right: 20px;
}
</style>