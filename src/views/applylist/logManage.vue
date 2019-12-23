<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label>
          <el-input    
            placeholder="关键字"
            v-model="listQuery.keyword"
          ></el-input>
        </el-form-item>
        <el-form-item label>
          <el-date-picker v-model="listQuery.startTime" type="date" placeholder="开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label>
          <el-date-picker v-model="listQuery.endTime" type="date" placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            class="filter-item"
            type="primary"
            v-waves
            icon="el-icon-search"
            @click="handleFilter"
          >{{$t('table.search')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="logMangementList"
      v-loading="listLoading"
      stripe
      
    >
      <el-table-column type="index" align="center"></el-table-column>
      <el-table-column label="用户名称" prop="userName" align="center"></el-table-column>
      <el-table-column label="内容 " prop="content" align="center"></el-table-column>
      <el-table-column label="操作时间" prop="addTime" align="center"></el-table-column>   
    </el-table>
    
    <div class="pagination-container"
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.curpage"
        :page-sizes="[10,20,30,40,50]"
        :page-size="listQuery.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import {
  getLogManagement,
} from "@/api/article";
//#67c23a
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
      dialogFormVisible: false,
      listQuery: {
        userid:"",
        startTime: "",
        endTime: "",
        keyword: "",
        curpage: 1,
        pagesize: 10
      },
      logMangementList:[],
      listLoading: true,
      total: 0
    };
  },
  filters: {
  },
  created() {
    // this.getList();
    this.listLoading = false;//图标加载
    this.getList();
  },
  methods: {
    getList(){
      getLogManagement(this.listQuery).then(res=>{
          console.log(res)
          this.logMangementList = res.datas.list;
          this.total = parseInt(res.datas.total_count);

      })
    },
    handleFilter() {
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.curpage = val;
      this.getList();
    },
    editTouristInfo(row) {
      console.log(row)
      this.$router.push({
        path: "/apply/updateOrderInfo",
        query: { id: row.id }
      });
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
</style>