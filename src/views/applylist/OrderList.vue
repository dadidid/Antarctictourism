<template>
  <div class="app-container">
     <el-dialog title="取消订单" :visible.sync="dialogFormVisible">
  <el-form :model="data">
    <el-form-item label="取消原因" >
      <el-input v-model="data.cancelReason" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="钱款流动" >
      <el-input v-model="data.orderCancelMoneyState" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="cancelOrderF">确 定</el-button>
  </div>
</el-dialog>
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label>
          <el-input    
            placeholder="姓名"
            v-model="listQuery.name"
             @blur="getList()"
          ></el-input>
        </el-form-item>
        <el-form-item label>
          <el-input
            placeholder="官方行程代码"
            v-model="listQuery.tripCode"
            @blur="getList()"
          ></el-input>
        </el-form-item>
        <el-form-item label>
          <el-input
            placeholder="订单编号"
            v-model="listQuery.code"
            @blur="getList()"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
          v-model="timeArray"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          value-format="yyyy-MM-dd"
          @blur="getList()">
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
          <el-button
            class="filter-item"
            @click="addTourist"
            type="primary"
            icon="el-icon-edit"
          >{{$t('table.add')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="orderList"
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
                    <span>姓名：{{ props.row.touristName }}</span>
                  </el-form-item>
                  <el-form-item label>
                    <span>官方行程代码：{{ props.row.tripCode }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>游轮公司：{{ props.row.companyName }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>游轮：{{ props.row.shipName }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>登船日期：{{ props.row.onBoardDate }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>订单编号：{{ props.row.companyName }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>房型：{{ props.row.roomType }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>房间号：{{ props.row.roomNumber }}</span>
                  </el-form-item>
                </el-row>
                 <el-row>
                  <el-form-item label>
                    <span>上游：{{ props.row.upperName }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>和上游结算价：{{ props.row.upperPrice}}</span>
                  </el-form-item>
                  <el-form-item label>
                    <span>下游：{{ props.row.downName  }}</span>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-row>
                  <el-form-item label>
                    <span>和下游结算价：{{ props.row.downPrice }}</span>
                  </el-form-item>
                  <el-form-item label>
                    <span>手续费金额：{{ props.row.fee }}</span>
                  </el-form-item>
                  <el-form-item label>
                    <span>盈利金额：{{props.row.profit}}</span>
                  </el-form-item>
                  <el-form-item label>
                    <span>订单结算单位：{{ props.row.unit }}</span>
                  </el-form-item>
                  <el-form-item label>
                    <span>预订日期：{{ props.row.orderDate }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>上游已收到的订金金额：{{ props.row.upperReceived }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>下游已支付的订金金额：{{ props.row.downPayed }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>订金已付清：{{ props.row.preOrderPayState | statusFilter}} {{props.row.preOrderPayNote }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>备注：{{ props.row.preOrderNote }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>获客工作人员：{{ props.row.userName }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>尾款截止日期：{{ props.row.payDeadLine }}</span>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-row>
                  <el-form-item label>
                    <span>上游已收到的尾款金额：{{ props.row.upperLeftReceived }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>下游已支付的尾款金额：{{ props.row.downLeftPayed }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>向上游结算的余款金额：{{ props.row.upperPrice-props.row.upperReceived-props.row.upperLeftReceived}}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>向下游结算的余款金额：{{ props.row.downPrice-props.row.downPayed-props.row.downLeftPayed}}</span>
                  </el-form-item>
                  <el-form-item label>
                    <span>尾款已付清：{{ props.row.orderLeftPayState | statusFilter}} {{props.row.orderLeftPayNote }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>备注：{{ props.row.orderLeftNote}}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>签证已办：{{ props.row.visaState | statusFilter}} {{props.row.visaNote }}</span>
                  </el-form-item>
                  <el-form-item label>
                    <span>机票已买：{{ props.row.ticketState | statusFilter}} {{props.row.ticketNote }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>在线表格已发送：{{ props.row.onlineTableSendState| statusFilter}} {{props.row.onlineTableSendNote }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>在线表格已填写：{{ props.row.onlineTableFinishState | statusFilter}} {{props.row.onlineTableFinishNote }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="">
                    <span>行前文档已发送:{{ props.row.fileSendState | statusFilter}} {{props.row.fileSendNote }}</span>
                  </el-form-item>
                </el-row>       
              </el-col>
              <el-col :span="6">
                <el-row>
                  <el-form-item label="">
                    <span>纪念品已发送:{{ props.row.giftSendState | statusFilter}} {{props.row.giftSendNote }}</span>
                  </el-form-item>
                </el-row> 
                <el-row>
                  <el-form-item label="">
                    <span>已顺利登船:{{ props.row.onboardState | statusFilter}} {{props.row.onboardNote }}</span>
                  </el-form-item>
                </el-row> 
                <el-row>
                  <el-form-item label="">
                    <span>跟进工作人员:{{ props.row.followUserName }}</span>
                  </el-form-item>
                </el-row> 
                <el-row>
                  <el-form-item label="">
                    <span>下船日期:{{ props.row.offBoardDate}}</span>
                  </el-form-item>
                </el-row> 
                <el-row>
                  <el-form-item label="">
                    <span>调查问卷已发送:{{ props.row.surveySendState | statusFilter}} {{props.row.surveySendNote }}</span>
                  </el-form-item>
                </el-row> 
                <el-row>
                  <el-form-item label="">
                    <span>调查问卷已填写:{{ props.row.surveyFinishState | statusFilter}} {{props.row.surveyFinishNote }}</span>
                  </el-form-item>
                </el-row> 
                <el-row>
                  <el-form-item label="">
                    <span>回访记录:{{ props.row.surveyNote}}</span>
                  </el-form-item>
                </el-row> 
                <el-row>
                  <el-form-item label="">
                    <span>游记意向或链接:{{ props.row.wishNote}}</span>
                  </el-form-item>
                </el-row> 
                <el-row>
                  <el-form-item label="">
                    <span>后续工作人员:{{ props.row.lastFollowUserName }}</span>
                  </el-form-item>
                </el-row>
                 <el-row>
                  <el-form-item label="">
                    <span>取消原因:{{ props.row.cancelReason }}</span>
                  </el-form-item>
                </el-row> 
                 <el-row>
                  <el-form-item label="">
                    <span>钱款流动:{{ props.row.orderCancelMoneyState }}</span>
                  </el-form-item>
                </el-row> 
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="订单编号" prop="orderCode" align="center"></el-table-column>
      <el-table-column label="中文姓名 " prop="touristName" align="center"></el-table-column>
      <el-table-column label="游轮" prop="shipName" align="center"></el-table-column>
      <el-table-column label="官方行程代码" prop="tripCode" align="center"></el-table-column>
      <el-table-column label="登船日期" prop="onBoardDate" align="center"></el-table-column>
      <el-table-column label="下船日期" prop="offBoardDate" align="center"></el-table-column>
      <el-table-column label="预订日期" prop="orderDate" align="center"></el-table-column>
      <el-table-column label="状态" prop="cstate" align="center"></el-table-column>
      <el-table-column label="操作" min-width="150px" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="success" size="mini" @click="finishOrderF(scope.row)" :disabled="scope.row.state !=='0'">完成</el-button>
            <el-button type="info" size="mini" @click="cancelOrderFuc(scope.row)"  :disabled="scope.row.state !=='0'">取消</el-button>
            <el-button type="danger" size="mini" @click="disCancelOrderFunc(scope.row)" :disabled="scope.row.state !=='1'">撤回</el-button>
            <el-button type="primary" size="mini" @click="editTouristInfo(scope.row)" :disabled="scope.row.state !=='0'">修改</el-button>
          </el-button-group>
        </template>
      </el-table-column>
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
  getOrderList,
  delOrderInfo,
  finishOrder,
  cancelOrder,
  disCancelOrder,
} from "@/api/article";

import waves from "@/directive/waves"; // 水波纹指令
import { parseTime } from "@/utils";
import lang from "@/lang";
const calendarTypeOptions = [
  { key: "开体驳", display_name: "开体驳" },
  { key: "开底驳", display_name: "开底驳" },
  { key: "耙吸式", display_name: "耙吸式" }
];
// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});
export default {
  name: "ship",
  directives: {
    waves
  },
  data() {
    return {
      timeArray:[],
      dialogFormVisible: false,
      data:{
        id: "",
        cancelReason:"",
        orderCancelMoneyState:"",
      },
      stateOptions: [
        { label: "完成", value: "0" },
        { label: "撤回", value: "1" },
        { label: "取消", value: "2" },
        { label: "修改", value: "2" },
      ],
      listQuery: {
        endTime: "",
        startTime: "",
        code: "",//订单编号
        name: "",
        tripCode:"",
        curpage: 1,
        pagesize: 10,
      },
      tableKey: "orderList",
      orderList: [],
      listLoading: true,
      total: 0
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = ["是","否"]
      return statusMap[status-1]+" ";
    },
    // typeFilter(type) {
    //   return calendarTypeKeyValue[type];
    // },
    // sexfilter(num) {
    //   const sex = ["男", "女"];
    //   return sex[num];
    // },
    // routefiler(route) {
    //   return route.replace(/\|/g, " "); // |正则匹配需要转义字符，replace需要全局匹配/g
    // },
    
  },
  watch: {
     timeArray:function (newval,oldval) {
          this.listQuery.startTime = newval[0];
          this.listQuery.endTime = newval[1];
          console.log(this.listQuery);
     }
  },
  created() {
    // this.getList();
    this.listLoading = false;//图标加载
    this.getList();
  },
  methods: {
      //完成订单
    finishOrderF(row){
        this.$confirm("此操作将完成订单信息,完成后的订单不可更改,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
        }).then(()=>{
          finishOrder(row.id).then(res=>{
            console.log(res)
           if (res.code === 200) {
              this.getList()   
            }
            
        })
        }).catch(()=>{
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        })
       
    },
    //取消订单接口
    cancelOrderFuc(row){
        this.data.id = row.id
        this.$confirm("此操作将取消订单信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.dialogFormVisible =true;
        })
    },
    cancelOrderF(){
      cancelOrder(this.data).then(res=>{
      console.log(res)
        if (res.code === 200) {
          this.dialogFormVisible = false;
          // this.$message({
          //   type: "info",
          //   message: "已取消订单"
          //   }).then(()=>{
          //     this.$router.go(0);
          //   }) 
          this.getList()
         }
         
      })  
    },
    disCancelOrderFunc(row){
      this.$confirm("此操作将撤销已取消订单,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
        }).then(()=>{
          disCancelOrder(row.id).then(res=>{
          if (res.code === 200) {
              this.getList()  
            }
        }).catch(()=>{
           this.$message({
            type: "info",
            message: "已取消操作"
          });
        })
     
      })
    },
    //初始化拿到订单列表
    getList() {
      // if (timeArray.length !== 0) {
      //     console.log(timeArray)
      // }
      console.log(this.listQuery)
      this.listLoading = true //加载图标
      getOrderList(this.listQuery).then(response => {
        this.orderList = response.datas.list || [];
        console.dir('dir',this.orderList)
        for (let index = 0; index < this.orderList.length; index++) {
            // console.log(this.orderList[index].state)
            switch (this.orderList[index].state) {
              case "0":
                this.orderList[index]['cstate'] ="进行中"
                 break;
              case "1":
                this.orderList[index]['cstate'] ="已取消"
                 break;
              case "2":
                this.orderList[index]['cstate'] ="已完成"
                 break;
              default:
                break;
            }
        }
        console.log(this.orderList)
        this.total = parseInt(response.datas.total_count);
        this.listLoading = false; //加载图标结束
      });
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
      this.$router.push({ path: "/apply/OrderEdit" });
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