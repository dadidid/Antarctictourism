<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
        <span>查找客户</span>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="英文姓名" prop="touristCode">
              <el-select
                v-model="ruleForm.touristId"
                filterable
                placeholder="请选择"
                style="width:100%;"
                
              >
                <el-option
                  v-for="item in custumerList"
                  :key="item.id"
                  :label="item.showinfo"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label>
              <el-button type="success" @click="EditToutrisInfo()">编辑游客</el-button>
              <el-button type="primary" @click="creatNewToutristInfo()">新建游客</el-button>
            </el-form-item>
          </el-col>
          
        </el-row>
        <span>查找行程</span>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="游轮公司和游轮">
              <el-select placeholder="请选择" clearable v-model="test1" filterable >
                <el-option
                  v-for="item in companyApplyList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  
                ></el-option>
              </el-select>
              <el-select placeholder="请选择" clearable v-model="test2" filterable>
                <el-option
                  v-for="item in tripList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登船日期">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="tripQuery.startTime"
                type="date"
                placeholder="选择日期时间"
                style="width:50%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
          <el-form-item label="官方行程代码">
            <el-input
              placeholder="请输入官方行程代码"
              style="width:100%;"
              v-model="tripQuery.tripCode"
              @change="getTripListInfo"
            ></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label>
               <el-button type="info" @click="getTripListInfo()">查询行程</el-button>
              <el-button type="success" @click="editTripListInfo()">编辑行程</el-button>
              <el-button type="primary" @click="createNewRoute()">新建行程</el-button>
              </el-form-item>
              </el-col>         
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="行程详细信息">
              <el-select style="width:100%;" v-model="ruleForm.tripCode"  placeholder="请选择" @change="changeTripInfo" >
                <el-option v-for="item in tripInfoList"
                  :key="item.tripCode"
                  :label="item.showRouteInfo"
                  :value="item.tripCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <span>订单详情</span>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单编号" prop="weixinName">
              <el-input :disabled="true" v-model="ruleForm.weixinName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房型" >
              <el-input v-model="ruleForm.roomType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房间号" >
              <el-input v-model="ruleForm.roomNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="上游" >
              <el-select v-model="ruleForm.upperId" placeholder style="width:100%;" filterable>
                <el-option
                  v-for="item in upperCompany"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                 
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="和上游结算价" prop="weixinName">
              <el-input v-model="ruleForm.upperPrice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="下游" prop>
              <el-select v-model="ruleForm.downId" placeholder style="width:100%;" filterable>
                <el-option
                  v-for="item in downCompany"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="和下游结算价" prop>
              <el-input v-model="ruleForm.downPrice"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="手续费金额" prop>
              <el-input v-model="ruleForm.fee"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="盈利金额" prop>
              <el-input v-model="outerProfit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单结算单位" prop>
              <el-select v-model="ruleForm.unitType" placeholder style="width:100%;">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <span>流程控制-订金</span>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="8">
            <el-form-item label="预订日期" prop="earliestDepartureDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.orderDate"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="上游已收订金" prop="lastReturnDate">
              <el-input v-model="ruleForm.upperReceived"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下游已付订金" prop="lastReturnDate">
              <el-input v-model="ruleForm.downPayed"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="订金已付清">
              <el-radio v-model="ruleForm.preOrderPayState" label="1">是</el-radio>
              <el-radio v-model="ruleForm.preOrderPayState" label="2">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="40px" label-position="left"  label="备注" v-show="ruleForm.preOrderPayState === '2'">
              <el-input  v-model="ruleForm.preOrderPayNote" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input v-model="ruleForm.preOrderNote"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="获客工作人员">
              <el-select v-model="ruleForm.userId" placeholder="请选择" filterable>
                <el-option
                  v-for="item in AdminList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <span>流程控制-尾款</span>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="8">
            <el-form-item label="尾款截止日期" prop="earliestDepartureDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.payDeadLine"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="上游已收尾款" prop="lastReturnDate">
              <el-input v-model="ruleForm.upperLeftReceived"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下游已付尾款" prop="lastReturnDate">
              <el-input v-model="ruleForm.downLeftPayed"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="向上游结算余款" prop="lastReturnDate">
              <el-input v-model="toUpperPrice" placeholder="根据和上游结算价-上游已收到的订金金额-上游已收到的尾款金额"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="向下游结算余款" prop="lastReturnDate">
              <el-input v-model="toDownPrice" placeholder="根据和下游的结算价-下游已支付的订金金额-下游已支付的尾款金额"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="尾款已付清">
              <el-radio v-model="ruleForm.orderLeftPayState" label="1">是</el-radio>
              <el-radio v-model="ruleForm.orderLeftPayState" label="2">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="4">
             <el-form-item label-width="40px" label-position="left"  label="备注" v-show="ruleForm.orderLeftPayState === '2'">
              <el-input  v-model="ruleForm.orderLeftPayNote" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input v-model="ruleForm.orderLeftNote"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <span>流程控制-附加</span>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="4">
            <el-form-item label="签证已办">
              <el-radio v-model="ruleForm.visaState" label="1">是</el-radio>
              <el-radio v-model="ruleForm.visaState" label="2">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="4">
             <el-form-item label-width="40px" label-position="left"  label="备注" v-show="ruleForm.visaState === '2'">
              <el-input  v-model="ruleForm.visaNote" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="机票已买">
              <el-radio v-model="ruleForm.ticketState" label="1">是</el-radio>
              <el-radio v-model="ruleForm.ticketState" label="2">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="40px" label-position="left"  label="备注" v-show="ruleForm.ticketState === '2'">
              <el-input  v-model="ruleForm.ticketNote" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="在线表格已发送">
              <el-radio v-model="ruleForm.onlineTableSendState" label="1">是</el-radio>
              <el-radio v-model="ruleForm.onlineTableSendState" label="2">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="4">
             <el-form-item label-width="40px" label-position="left"  label="备注" v-show="ruleForm.onlineTableSendState === '2'">
              <el-input  v-model="ruleForm.onlineTableSendNote" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="在线表格已填写">
              <el-radio v-model="ruleForm.onlineTableFinishState" label="1">是</el-radio>
              <el-radio v-model="ruleForm.onlineTableFinishState" label="2">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="40px" label-position="left"  label="备注" v-show="ruleForm.onlineTableFinishState === '2'">
              <el-input  v-model="ruleForm.onlineTableFinishNote" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="行前文档已发送">
              <el-radio v-model="ruleForm.fileSendState" label="1">是</el-radio>
              <el-radio v-model="ruleForm.fileSendState" label="2">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="4">
             <el-form-item label-width="40px" label-position="left"  label="备注" v-show="ruleForm.fileSendState === '2'">
              <el-input  v-model="ruleForm.fileSendNote" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="纪念品已发送">
              <el-radio v-model="ruleForm.giftSendState" label="1">是</el-radio>
              <el-radio v-model="ruleForm.giftSendState" label="2">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="40px" label-position="left"  label="备注" v-show="ruleForm.giftSendState === '2'">
              <el-input  v-model="ruleForm.giftSendNote" ></el-input>
            </el-form-item>
            <!-- <el-input v-model="ruleForm.giftSendNote" v-show="ruleForm.giftSendState === '2'"></el-input> -->
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="已顺利登船">
              <el-radio v-model="ruleForm.onboardState" label="1">是</el-radio>
              <el-radio v-model="ruleForm.onboardState" label="2">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="40px" label-position="left"  label="备注" v-show="ruleForm.onboardState === '2'">
              <el-input  v-model="ruleForm.onboardNote" ></el-input>
            </el-form-item>
            <!-- <el-input v-model="ruleForm.onboardNote" v-show="ruleForm.onboardState === '2'"></el-input> -->
          </el-col>
          <el-col :span="8">
            <el-form-item label="跟进工作人员">
              <el-select v-model="ruleForm.followUserId" placeholder="请选择" filterable>
                <el-option
                  v-for="item in AdminList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
               
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <span>流程控制-后续</span>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="4">
            <el-form-item label="下船日期">
              <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.offBoardDate" type="date" placeholder="下船日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4" >
            <el-form-item label="调查问卷已发送">
              <el-radio v-model="ruleForm.surveySendState" label="1">是</el-radio>
              <el-radio v-model="ruleForm.surveySendState" label="2">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="4">
             <el-form-item label-width="40px" label-position="left"  label="备注" v-show="ruleForm.surveySendState === '2'">
              <el-input  v-model="ruleForm.surveySendNote" ></el-input>
            </el-form-item>
            <!-- <el-input v-model="ruleForm.surveySendNote" v-show="ruleForm.surveySendState === '2'"></el-input> -->
          </el-col>
          <el-col :span="4">
            <el-form-item label="调查问卷已填写">
              <el-radio v-model="ruleForm.surveyFinishState" label="1">是</el-radio>
              <el-radio v-model="ruleForm.surveyFinishState" label="2">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="40px" label-position="left"  label="备注" v-show="ruleForm.surveyFinishState === '2'">
              <el-input  v-model="ruleForm.surveyFinishNote" ></el-input>
            </el-form-item>
            <!-- <el-input v-model="ruleForm.surveyFinishNote" v-show="ruleForm.surveyFinishState === '2'"></el-input> -->
          </el-col>
        </el-row>
        <el-row>
          <el-row>
            <el-form-item label="回访记录">
              <el-input v-model="ruleForm.surveyNote" type="textarea" placeholder style="width:50%;"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="游记意向或链接">
                <el-input v-model="ruleForm.wishNote"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="后续工作人员">
                <el-select v-model="ruleForm.lastFollowUserId"  placeholder="请选择" filterable>
                  <el-option
                    v-for="item in AdminList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
         <!-- <div v-show="concelFlag">
            <span>行程预订取消</span>
          <el-divider></el-divider>
         </div>
          <el-row>
            <el-col :span="12">
              <el-form-item v-show="concelFlag" label="取消原因">
                <el-input v-show="concelFlag" v-model="ruleForm.cancelReason" placeholder></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item v-show="concelFlag" label="钱款流动">
                <el-input v-model="ruleForm.orderCancelMoneyState" type="textarea" placeholder></el-input>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-col :span="12" :offset="8">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button type="danger" @click="cancelOrderInfo()">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label></el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  addtouristinfo,
  getTouristList,
  getCompanyList,
  getTripInfoList,
  getTripList,
  getUpperUserList,
  getDownnerUserList,
  getAdminUserList,
  addNewOrder,
  getUpperCompanyList,
  getDownnerCompanyList
} from "@/api/article";
import lang from "@/lang";
import { checkPhone, validatePhone, validateEmail } from "@/utils/validate";

export default {
  name: "companyapply",
  data() {
    return {
      upperCompany:[

      ],
      downCompany:[

      ],
      AdminList:[

      ],
      options:[
        {id:"1",name:"人民币"},
        {id:"2",name:"美元"},
        {id:"3",name:"欧元"},
        {id:"4",name:"其他"},
      ],
      // toUpperPrice:"",
      // toDownPrice:"",
      concelFlag:false,
      flag: false,
      tripList: [],
      companyApplyList: [],
      custumerList: [],
      custumerQuery: {
        pagesize: 2000,
        curpage: 1
      },
      tripQuery: {
        pagesize: 10,
        curpage: 1,
        name: "",
        companyId: "",
        shipId: "",
        startTime: "",
        tripCode:"",
      },
      QueryDetailInfo: {
        tripCode: "",
        companyName: "",
        shipName: "",
        offBoardTime: "",
        onBoardTime: "",
        detailInfo: "",
        id: ""
      },
      tripInfoList:[],
      test1: "",
      test2: "",
      selectcompamy: "",
      ruleForm: {
        code: "", //订单编号
        touristId: "",
        touristName: "",
        tripId: "",
        tripCode: "",
        companyId: "",//1
        companyCode: "",
        companyName: "",//1
        shipId: "",//1
        shipCode: "",
        shipName: "",//1
        onBoardDate: "",
        roomType: "",
        roomNumber: "",
        upperId: "",//
        upperName: "",//
        upperPrice: "",
        downId: "",//
        downName: "",//
        downPrice: "",
        fee: "",
        profit: "",
        unitType: "",
        unit: "",//
        orderDate: "",
        upperReceived: "",
        downPayed: "",
        preOrderPayState: "",
        preOrderPayNote: "",
        preOrderNote: "",
        userId: "",
        userName: "",
        payDeadLine: "",
        upperLeftReceived: "",
        downLeftPayed: "",
        orderLeftPayState: "",  
        orderLeftPayNote: "",
        orderLeftNote: "",
        visaState: "", 
        visaNote: "",
        ticketState: "", 
        ticketNote: "",
        onlineTableSendState: "", 
        onlineTableSendNote: "",
        onlineTableFinishState: "", 
        onlineTableFinishNote: "",
        fileSendState: "", 
        fileSendNote: "",
        giftSendState: "", 
        giftSendNote: "",
        onboardState: "", 
        onboardNote: "",  
        followUserId: "",
        followUserName: "",
        offBoardDate: "",
        surveySendState: "",
        surveySendNote: "",
        surveyFinishState: "",
        surveyFinishNote: "",
        surveyNote: "",
        wishNote: "",
        lastFollowUserId: "",  //未处理  后续工作人员 接口
        lastFollowUserName: "",//未处理  后续工作人员 接口
        cancelReason: "",
        orderCancelMoneyState: "",
        tripDays:"",
      },
      tripListQuery: {
        pagesize: 10,
        curpage: 1,
        companyId: "",
      },
      UDListQuery: {
        pagesize: 10,
        curpage: 1,
        name: "",
      },
      listQuery: {
        pagesize: 10,
        curpage: 1,
        companyId: ""
      },
      applyed: 0,
      dialogImageUrl: "",
      dialogVisible: false,
      rules: {
        firstName: [
          { required: true, message: "请输入英文姓", trigger: "blur" }
        ],
        lastName: [{ required: true, message: "请输入英文名", trigger: "blur" }]
      },

      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  computed: {
    toUpperPrice:function name() {
          return this.ruleForm.upperPrice-this.ruleForm.upperReceived-this.ruleForm.upperLeftReceived
    },
    toDownPrice:function name() {
          return this.ruleForm.downPrice-this.ruleForm.downPayed-this.ruleForm.downLeftPayed
    },
    outerProfit:function name () {
          return this.ruleForm.upperPrice - this.ruleForm.downPrice - this.ruleForm.fee
   }
  }, 
 watch: {
    test1 : function (newval,oldval) {
        this.test2 = ""; 
        this.ruleForm.companyId = newval
        this.listQuery.companyId = this.ruleForm.companyId;
        this.getTripName();
    },
 }, 
 
  created() {
    // this.getBeianCompany()
    // console.log('this',this)
    this.getCustomerList();
    this.getCompanyInfo();
    this.getUpperCompany();
    this.getDownnerCompany();
    this.getAdminList();
  },
  methods: {
    //根据ruleForm.id赋给ruleForm.name的通用函数
    fromIdToName(sid,array){
      for (let index = 0; index < array.length; index++) {
          if (array[index].id === sid){
            return array[index].name
          }
      }
    },
    //获取上游公司
    getUpperCompany(){
      getUpperCompanyList(this.UDListQuery).then(res=>{
          this.upperCompany = res.datas.list;
          console.log('上游',this.upperCompany)
      })
    },
    //获取下游公司
    getDownnerCompany(){
        getDownnerCompanyList(this.UDListQuery).then(res=>{
          this.downCompany =res.datas.list;
        })
    },
    //获取运营人员
    getAdminList(){
      getAdminUserList().then(res=>{
          this.AdminList = res.datas.list;
      })
    },
    //取消订单
    cancelOrderInfo(){
          this.$router.push({path:'/applylist/OrderList'})
    },
    //旅客信息处理问题
    touristInfocpl(){
      console.log(this.ruleForm)
      for (let index = 0; index < this.custumerList.length; index++) {
        if (this.custumerList[index].id === this.ruleForm.touristId) {
            this.ruleForm.touristName = this.custumerList[index].name;
        }    
      }
    },
    changeTripInfo(){
      console.log(this.tripInfoList)
        for (let index = 0; index < this.tripInfoList.length; index++) {
          if (this.ruleForm.tripCode === this.tripInfoList[index].tripCode) {
                this.ruleForm.tripId = this.tripInfoList[index].id
                this.ruleForm.companyId = this.tripInfoList[index].companyId
                this.ruleForm.companyName = this.tripInfoList[index].companyName
                this.ruleForm.shipName = this.tripInfoList[index].shipName
                this.ruleForm.shipId =  this.tripInfoList[index].shipId
                this.ruleForm.onBoardDate =  this.tripInfoList[index].onBoardTime
                this.ruleForm.offBoardDate =  this.tripInfoList[index].offBoardTime
          }  
        }
        console.log(this.ruleForm)
    },
    //新建行程信息
    createNewRoute() {
      this.$router.push({
        path: "/apply/RouteEdit"
      });
    },
    //编辑行程信息
    editTripListInfo() {
       for (let index = 0; index < this.tripInfoList.length; index++) {
            if (this.tripInfoList[index].tripCode === this.ruleForm.tripCode ) {
                this.ruleForm.tripId = this.tripInfoList[index].id;
            }
        }
      this.$router.push({
        path: "/apply/updateRouteInfo",
        query: { id:  this.ruleForm.tripId }
      });
    },
    //查询行程信息
    getTripListInfo() {
      this.tripInfoList = [];
      this.flag = true;
      this.tripQuery.companyId = this.test1;
      this.tripQuery.shipId = this.test2;
      console.log(this.tripQuery)
      getTripList(this.tripQuery).then(res => {
        this.tripInfoList = res.datas.list;
        console.log(this.tripInfoList)
        for (let index = 0; index < this.tripInfoList.length; index++) {
          this.tripInfoList[index]['showRouteInfo'] = "行程代码: "+this.tripInfoList[index].tripCode+
          " "+"公司: " +this.tripInfoList[index].companyName+" " +"游轮名: "
          +this.tripInfoList[index].shipName+" "+"登船日期: "+this.tripInfoList[index].onBoardTime
          +" "+"下船日期: "+this.tripInfoList[index].offBoardTime+" "+"旅游地区: "+this.tripInfoList[index].wishArea
        }
        console.log(this.tripInfoList)
        // console.log(res)
      //   for (var property in res.datas.list[0]) {
      //     this.QueryDetailInfo[property] = res.datas.list[0][property];
      //   }
      // this.ruleForm.tripId = this.QueryDetailInfo.id;
      // this.ruleForm.tripCode = this.QueryDetailInfo.tripCode;
      // this.ruleForm.companyId = this.QueryDetailInfo.companyId;
      // this.ruleForm.companyCode = this.QueryDetailInfo.companyCode;
      // this.ruleForm.companyName = this.QueryDetailInfo.companyName;
      // this.ruleForm.shipId = this.QueryDetailInfo.shipId;
      // this.ruleForm.shipCode = this.QueryDetailInfo.shipCode;
      // this.ruleForm.shipName = this.QueryDetailInfo.shipName;
      // this.ruleForm.onBoardDate = this.QueryDetailInfo.onBoardTime;
      });
    },
    //游轮信息
    getTripName() {
      getTripInfoList(this.listQuery).then(res => {
        this.tripList = res.datas.list || [];
      });
    },
    //游轮公司信息
    getCompanyInfo() {
      getCompanyList(this.listQuery).then(response => {
        this.companyApplyList = response.datas.list || [];
      });
    },
    //编辑游客信息
    EditToutrisInfo() {
      this.$router.push({
        path: "/apply/modifyTouristInfo",
        query: { applyid: this.ruleForm.touristId }
      });
    },
    //展示游客信息
    getCustomerList() {
      getTouristList(this.custumerQuery).then(res => {
        res.datas.touristList.forEach(ele => {
          let singleTouristInfo = {};
          singleTouristInfo.ename = ele.firstName + " " + ele.lastName;
          singleTouristInfo.name = ele.name;
          if (ele.gender === "0") {
            singleTouristInfo.gender = "男";
          } else {
            singleTouristInfo.gender = "女";
          }
          singleTouristInfo.touristCode = ele.touristCode;
          singleTouristInfo.birthday = ele.birthday;
          singleTouristInfo.id = ele.id;
          var sbirthday = ele.birthday.substring(5);
          singleTouristInfo.showinfo =
            ele.firstName +
            " " +
            ele.lastName +
            " " +
            ele.name +
            " " +
            "" +
            singleTouristInfo.gender +
            " " +
            sbirthday +
            " " +
            ele.touristCode;
          this.custumerList.push(singleTouristInfo);
        });
      });
    },
    //跳转新建游客界面
    creatNewToutristInfo() {
      this.$router.push({ path: "/apply/touristListEdit" });
    },
    onSubmit() {
      this.createData();
    },
    //时间字段
    OBoardDate(){
      console.log(this.ruleForm.onBoardDate,this.ruleForm.offBoardDate)
      var newOndate = new Date(this.ruleForm.onBoardDate).getTime();
      var newOffdate = new Date(this.ruleForm.offBoardDate).getTime();
      var times = (newOffdate - newOndate)/1000/60/60/24;
      this.ruleForm.tripDays = times;
    },
    //提交前整理
    createData() {
      const vm = this;
      this.touristInfocpl();
      this.ruleForm.profit =  this.outerProfit;
      this.ruleForm.upperName = this.fromIdToName(this.ruleForm.upperId,this.upperCompany)
      this.ruleForm.downName = this.fromIdToName(this.ruleForm.downId,this.downCompany)
      this.ruleForm.unit = this.fromIdToName(this.ruleForm.unitType,this.options)
      this.ruleForm.userName = this.fromIdToName(this.ruleForm.userId,this.AdminList)
      this.ruleForm.followUserName = this.fromIdToName(this.ruleForm.followUserId,this.AdminList)
      this.ruleForm.lastFollowUserName = this.fromIdToName(this.ruleForm.lastFollowUserId,this.AdminList)
      this.OBoardDate()
      console.log(this.ruleForm)
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          addNewOrder(vm.ruleForm).then(response => {
            console.log(response);
            if (response.code == 200) {
              this.$notify({
                title: "成功",
                message: "提交成功",
                type: "success",
                duration: 2000
              });
              this.$router.push({ path: "/apply/OrderList" });
            } else {
              this.$notify({
                title: "提交失败",
                message: "提交失败",
                type: "success",
                duration: 2000
              });
            }
          });
        }
      });
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

.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}
</style>
<style>
label {
  font-weight: 400 !important;
}
p {
  font-size: 15px;
  margin: 0px;
}

</style>