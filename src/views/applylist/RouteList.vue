<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label>
          <el-input    
            placeholder="官方行程代码"
            v-model="listQuery.tripCode"
          ></el-input>
        </el-form-item>
        <el-form-item label>
          <el-input    
            placeholder="公司名称"
            v-model="listQuery.companyName"
          ></el-input>
        </el-form-item>
        <el-form-item label>
          <el-input    
            placeholder="船只名称"
            v-model="listQuery.shipName"
          ></el-input>
        </el-form-item>
        <el-form-item label>
          <el-date-picker
          value-format="yyyy-MM-dd"
           v-model="listQuery.startTime" type="date" placeholder="开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label>
          <el-date-picker 
          value-format="yyyy-MM-dd"
          v-model="listQuery.endTime" type="date" placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            class="filter-item"
            type="primary"
            v-waves
            icon="el-icon-search"
            @click="getList"
          >{{$t('table.search')}}</el-button>
        </el-form-item>
         <el-form-item>
          <el-button
            class="filter-item"
            type="primary"
            v-waves
            icon="el-icon-plus"
            @click="skipAddRoute"
          >新增行程</el-button>
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
    <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand" label-width="120px">
            <el-row>
              <el-col :span="6">
                <el-row>
                <el-form-item label>
​                    <span>官方行程代码：：{{ props.row.tripCode }}</span>
​                  </el-form-item>
                </el-row>
                <el-row>
                  
​                  <el-form-item label>
​                    <span>游轮公司：{{ props.row.companyName }}</span>
​                  </el-form-item>  
                </el-row>
                <el-row>
                  <el-form-item label>
​                    <span>游轮：{{ props.row.shipName }}</span>
​                  </el-form-item>  
                </el-row>
                            
​                   
              </el-col>
              <el-col :span="6">
                <el-row>
                  <el-form-item label>
​                    <span>登船日期：{{ props.row.onBoardTime }}</span>
​                  </el-form-item>  
                </el-row>
                 <el-row>
                  <el-form-item label>
​                    <span>下船日期：{{ props.row.offBoardTime }}</span>
​                  </el-form-item>​  
                </el-row>
                 <el-row>
                   <el-form-item label>
​                    <span>是否豪华船：{{ props.row.isLux }}</span>
​                  </el-form-item>
                </el-row>                         ​                             ​             
              </el-col>
              <el-col :span="6">
                <el-row>
                    <el-form-item label>
​                    <span>意向区域：{{ props.row.wishArea }}</span>
​                  </el-form-item>  
                </el-row>
                <el-row>
                   <el-form-item label>
​                    <span>南极意向区域：{{ props.row.wishSouthArea | routefiler }}</span>
​                  </el-form-item>  
                </el-row>
                           
​                   
              </el-col>
              <el-col :span="6">
                <el-row>
                  <el-form-item label>
​                    <span>北极意向区域：{{ props.row.wishNorthArea | routefiler }}</span>
​                  </el-form-item>  
                </el-row>
                <el-row>
                    <el-form-item label>
​                    <span>其他意向区域：{{ props.row.wishOtherArea | routefiler }}</span>
​                 </el-form-item>
                </el-row>
                       
​               
              </el-col>
            </el-row>
            
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>

      <el-table-column label="官方行程代码" prop="tripCode" align="center"></el-table-column>
      <el-table-column label="游轮公司 " prop="companyName" align="center"></el-table-column>
      <el-table-column label="游轮" prop="shipName" align="center"></el-table-column>
      <el-table-column label="登船日期" prop="onBoardTime" align="center"></el-table-column>
      <el-table-column label="下船日期" prop="offBoardTime" align="center"></el-table-column>
      <el-table-column label="是否豪华船" prop="isLux" align="center"></el-table-column>
      <el-table-column label="载客人数" prop="seatNumber" align="center"></el-table-column>
      <el-table-column label="操作" min-width="150px" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" @click="editTouristInfo(scope.row)">修改</el-button>
            <el-button
              :disabled="scope.row.state==4"
              size="mini"
              type="danger"
              @click="delTripINfo(scope.row,'deleted')"
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
  delTrip,
  getTripList,
  delBeianCompany,
  fetchPv,
  createBoat,
  deleteBoat,
  updateBoat,
  fetchAllCompanyList,
  getTouristLis
} from "@/api/article";

import waves from "@/directive/waves";
import { parseTime } from "@/utils";
import lang from "@/lang";

export default {
  name: "ship",
  directives: {
    waves
  },
  data() {
    return {
      listQuery: {
        tripCode:"",
        startTime: "",
        endTime: "",
        shipName: "",
        companyName: "",
        curpage: 1,
        pagesize: 10
      },
      tableKey: "companyapplylist",
      companyApplyList: [],
      listLoading: true,
      total: 0
    };
  },
  created() {
    this.getList();
    this.listLoading = false;//图标加载
  },
  filters:{
    routefiler(route) {
      return route.replace(/\|/g, " "); // |正则匹配需要转义字符，replace需要全局匹配/g
    },
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
    getList() {
      // this.listLoading = true //加载图标
      console.log(this.listQuery)
      getTripList(this.listQuery).then(response => {
        console.log(response);
        this.companyApplyList = response.datas.list || [];
        console.log('打印',this.companyApplyList);
        for (let index = 0; index < this.companyApplyList.length; index++) {
          const ListInfo = this.companyApplyList[index];
          if (ListInfo.isLux === "1") {
            this.companyApplyList[index].isLux = "是";
          } else {
            this.companyApplyList[index].isLux = "否";
          }
          // for (let yindex = 0; yindex < this.national.length; yindex++) {
          //   if (ListInfo.otherNationality === this.national[xindex].value) {
          //       this.companyApplyList[index].otherNationality = this.national[yindex].label
          //   }
          // }
          // for (let zindex = 0; zindex < this.national.length; zindex++) {
          //   if (ListInfo.dualNationality === this.national[xindex].value) {
          //       this.companyApplyList[index].dualNationality = this.national[zindex].label
          //   }
          // }
        }
        this.total = parseInt(response.datas.total_count);
        this.listLoading = false; //加载图标结束
      });
    },
    editTouristInfo(row) {
      this.$router.push({
        path: "/apply/updateRouteInfo",
        query: { id: row.id }
      });
    },
    delTripINfo(row, status) {
      console.log(row);
      this.$confirm("此操作将永久删除单位备案信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          delTrip(row.id).then(response => {
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
    
    
    skipAddRoute(row) {
      this.$router.push({ path: "/apply/RouteEdit" });
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