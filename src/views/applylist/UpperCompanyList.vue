<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" @click="createNewUpperCompany">新增上游公司</el-button>
      
    </el-row>
    
    <el-table
      :data="companyApplyList"
      v-loading="listLoading"
      stripe
      style="width: 100%"
    >
      <el-table-column type="index" align="center"></el-table-column>
      <el-table-column label="公司名称"  prop="name" align="center"></el-table-column>
      <el-table-column label="操作" min-width="150px" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" @click="updateCompanyInfo(scope.row)">修改</el-button>
            <el-button
              :disabled="scope.row.state==4"
              size="mini"
              type="danger"
              @click="delCompanyInfo(scope.row,'deleted')"
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
  getUpperCompanyList,
  delUpperCompany
} from "@/api/article";

import waves from "@/directive/waves"; // 水波纹指令
import { parseTime } from "@/utils";
import lang from "@/lang";
export default {
  
  data() {
    return {
      listQuery:{
        pagesize:10,
        curpage:1,
        name:"",
      },
      companyApplyList:[],
      listLoading: true,
      total: 0
    }
  },
  created() {
    this.getList();
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
    createNewUpperCompany(){
        this.$router.push('/apply/UpperCompanyEdit')
    },
    getList() {
      this.listLoading = true //加载图标
      getUpperCompanyList(this.listQuery).then(response => {
        console.log(response);
        this.companyApplyList = response.datas.list || [];
        console.log(this.companyApplyList);     
        this.total = parseInt(response.datas.total_count);
        this.listLoading =false;
      });
    },
    updateCompanyInfo(row) {
      this.$router.push({
        path: "/apply/updateUpperCompanyInfo",
        query: { id: row.id,name : row.name }
      });
    },
    delCompanyInfo(row, status) {
      this.$confirm("此操作将永久删除单位备案信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delUpperCompany(row.id).then(response => {
            console.log(response)
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
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        status: "published",
        type: ""
      };
    },
    hasPermission(actionId) {
      const group = this.$store.getters.admingroupid;
      if (group == 1) return true;
      return false;
    },
    handleCreate() {
      if (!this.hasPermission("addShip")) {
        this.$notify({
          title: "没有权限",
          message: "当前用户没有操作权限",
          type: "success",
          duration: 2000
        });
        return;
      }

      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    addTourist(row) {
      this.$router.push({ path: "/apply/touristListEdit" });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    /* handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    }, */
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    transformSuper(value) {
      var str;
      if (parseInt(value) === 1) {
        str = "Yes";
      } else if (parseInt(value) === 0) {
        str = "No";
      } else {
        str = "";
      }
      return str;
    }
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