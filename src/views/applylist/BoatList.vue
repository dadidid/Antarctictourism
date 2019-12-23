<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label>
          <el-input @keyup.enter.native="handleFilter" placeholder="船名" v-model="listQuery.name"></el-input>
        </el-form-item>
        <el-form-item label>
         <el-select filterable v-model="listQuery.isLux"  placeholder="是否豪华">
           <el-option   v-for="item in options"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select>
         
        </el-form-item>
        <el-form-item label>
          <!-- <el-date-picker value-format="yyyy-MM-dd" v-model="listQuery.earliestDepartureDate" placeholder="最早出发日期"></el-date-picker>
          <el-date-picker v-model="listQuery.lastReturnDate" placeholder="最晚返回日期"></el-date-picker> -->
        </el-form-item>
        <el-form-item>
          <el-button
            class="filter-item"
            type="primary"
            v-waves
            icon="el-icon-search"
            @click="handleFilter"
          >搜索</el-button>
        </el-form-item>
        <el-form-item >
           <el-button  v-waves icon="el-icon-plus" type="primary" @click="createNewBoat()">新增游轮</el-button>
        </el-form-item>
        
      </el-form>
    </div>
    <el-table
      :key="tableKey"
      :data="companyApplyList"
      v-loading="listLoading"
      stripe
      style="width: 100%"
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column label="公司名称" prop="companyName" align="center"></el-table-column>
      <el-table-column label="船名 " prop="name" align="center"></el-table-column>
      <el-table-column label="是否豪华" prop="isLux" align="center"></el-table-column>
      <el-table-column label="载客人数" prop="seatNumber" align="center"></el-table-column>
      <el-table-column label="操作" min-width="150px" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" @click="updateBoatInfo(scope.row)">修改</el-button>
            <el-button
              :disabled="scope.row.state==4"
              size="mini"
              type="danger"
              @click="deleteTripInfo(scope.row,'deleted')"
            >删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
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
  getTripInfoList,
  deleteTripInfo
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
      options: [{
          value: 2,
          label: '是'
        }, {
          value: 1,
          label: '否'
        }],
      listQuery: {
        pagesize: 10,
        curpage: 1,
        isLux:"",
        name:"",
      },
      tableKey: "companyapplylist",
      companyApplyList: [],
      listLoading: true,
      total: 0
    };
  },
  created() {
    this.getList();
    this.listLoading = true;//图标加载
  },
  methods: {
    handleFilter() {
      this.listQuery.curpage = 1;
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
    handleFilter(){
      this.getList();
    },
    createNewBoat(){
      this.$router.push('/apply/BoatEdit')
    },
    getList() {
      // this.listLoading = true //加载图标
      getTripInfoList(this.listQuery).then(response => {
        console.log(response)
        this.companyApplyList = response.datas.list || [];
        this.total = parseInt(response.datas.total_count);
        this.listLoading = false; //加载图标结束
        for (let index = 0; index < this.companyApplyList.length; index++) {
          if (this.companyApplyList[index].isLux === "2") {
              this.companyApplyList[index].isLux = "是"
          } else {
              this.companyApplyList[index].isLux = "否"
          }
        }
        console.log(this.companyApplyList)
      });
    },
    updateBoatInfo(row) {
      this.$router.push({
        path: "/apply/updateBoatInfo",
        query: { companyId: row.companyId,
                 name:row.name,
                 isLux:row.isLux,
                 seatNumber:row.seatNumber,
                 id:row.id}
      });
    },
    deleteTripInfo(row, status) {
      this.$confirm("此操作将永久删除船只信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteTripInfo(row.id).then(response => {
            console.log(response);
            if (response.code == 200) {
              this.$message({
                message: "操作成功",
                type: "success"
              });
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    /* handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    }, */
    
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
</style>