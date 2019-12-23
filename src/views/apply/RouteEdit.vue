<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
        <span>官方行程</span>
        <el-divider></el-divider>
        <el-form-item label="官方行程代码" prop="code" >
          <el-input  style="width:30%;" v-model="ruleForm.code"></el-input>
        </el-form-item>
        <span>游轮</span>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="8">
            <el-form-item label="游轮公司和游轮" >
              <el-select placeholder="请选择" v-model="test1">
                <el-option
                  v-for="item in companyApplyList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  filterable
                ></el-option>
              </el-select>
              <el-select placeholder="请选择" v-model="test2">
                <el-option
                  v-for="item in tripList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  filterable
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否豪华船" >
              <el-input v-model="isLux" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="载客人数" >
              <el-input v-model="ruleForm.seatNumber" disabled></el-input>
              <span></span>
            </el-form-item>
          </el-col>
        </el-row>
        <span>日期</span>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="8">
            <el-form-item label="登船日期" >
              <el-date-picker  v-model="test3" value-format="yyyy-MM-dd" style="width:100%;" type="date" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下船日期" >
              <el-date-picker  v-model="test4" value-format="yyyy-MM-dd" type="date" style="width:100%;" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行程天数" >
              <el-input v-model="ruleForm.travelDays"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <span>线路</span>
        <el-divider></el-divider>
        <el-row>
          <el-form-item label="意向区域" >
            <el-radio v-model="areaid" label="1">南极</el-radio>
            <el-radio v-model="areaid" label="2">北极</el-radio>
            <el-radio v-model="areaid" label="3">加岛</el-radio>
            <el-radio v-model="areaid" label="4">其他</el-radio>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="南极意向区域"  v-show="areaid === '1'">
            <el-checkbox
              v-for="(val,key,index) in southwishAreaobj"
              v-model="southwishAreaobj[key]"
            >{{key}}</el-checkbox>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input v-model="othersouthwishArea" style="width:20%;" v-show="southwishAreaobj['其他']"></el-input>
            <span></span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="北极意向区域"  v-show="areaid === '2'">
            <el-checkbox
              v-for="(val,key,index) in northwishAreaobj"
              :key="key"
              v-model="northwishAreaobj[key]"
            >{{key}}</el-checkbox>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input v-model="othernorthwishArea" style="width:20%;" v-show="northwishAreaobj['其他']"></el-input>
            <span></span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="">
            <el-input v-model="otherArea" v-show="areaid === '4'"></el-input>
          </el-form-item>
        </el-row>
        <el-form-item label v-if="applyed==0">
          <el-button type="primary" @click="onSubmit">提交申请</el-button>
          <el-button @click="reset">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  getCompanyList,
  getTripInfoList,
  getSingleTripInfo,
  addTrip
} from "@/api/article";
import lang from "@/lang";
import { checkPhone, validatePhone, validateEmail } from "@/utils/validate";

export default {
  name: "companyapply",
  data() {
    return {
      areaid: "",
      otherArea: "",
      othersouthwishArea: "",
      othernorthwishArea: "",
      wishAreaobj: {
        南极: false,
        北极: false,
        加岛: false,
        其他: false
      },
      southwishAreaobj: {
        南极半岛: false,
        福克兰: false,
        南乔治亚: false,
        极圈: false,
        其他: false
      },
      northwishAreaobj: {
        斯瓦尔巴: false,
        格陵兰: false,
        加拿大北部: false,
        俄罗斯远东: false,
        其他: false
      },
      isLux:"",      
      ruleForm: {
        name: "",
        companyId: "",
        shipId: "",
        seatNumber: "",
        onBoardTime: "",
        offBoardTime: "",
        travelDays: "",
        code: "",
        wishArea: "",
        wishNorthArea:"",
        wishSouthArea:"",
        wishOtherArea:"",
      },
      test1:"",
      test2:"",
      test3:"",
      test4:"",
      listQuery:{
        pagesize:50,
        curpage:1,
        companyId:'',
      },
      tripList:[],
      companyApplyList:[],
      applyed: 0,
      dialogImageUrl: "",
      dialogVisible: false,
      rules: {
        code: [
          { required: true, message: "请输入官方行程代码", trigger: "blur" }
        ],  
      }
    };
  },
  watch: {
    test1 : function (newval,oldval) {
        this.test2 = ""; 
        this.ruleForm.companyId = newval
        this.listQuery.companyId = this.ruleForm.companyId;
        this.getTripName();
    },
    test2 : function (newval,oldval) {
        getSingleTripInfo(newval).then(
          res=>{
            console.log(res)
            this.ruleForm.name = res.datas.company.name;
            this.ruleForm.seatNumber = res.datas.company.seatNumber;
            this.ruleForm.shipId = res.datas.company.id;
            if (res.datas.company.isLux === '1') {
                this.isLux = "是"
            } else {
                this.isLux = '否'
            }
          }
        )
    },
      test3 : function (newval,oldval) {
        if ( newval !=="") {
            // var dateTime = newval + ' 00:00:00'
            var t3timestamp = new Date(newval).getTime();
            var daystimestamp =new Date(this.test4).getTime() - t3timestamp;            
            var days = daystimestamp/1000/60/60/24;
            console.log(days)
            if (days > 0) {
                this.ruleForm.travelDays =  days
            }
        }else{
            this.ruleForm.travelDays = '';
        }
    },
    test4 : function (newval,oldval) {
        if (newval !=="") {
            var t4timestamp = new Date(newval).getTime();
            var daystimestamp =t4timestamp - new Date(this.test3).getTime();          
            var days = daystimestamp/1000/60/60/24;
            console.log(days)
            if (days > 0) {
                this.ruleForm.travelDays =  days
            }
            // this.ruleForm.travelDays =days;
        }
    },
    areaid : function (newval,oldval) {
        switch (oldval) {
          case "1":
             for (var property1 in this.southwishAreaobj) {
                 this.southwishAreaobj[property1] = false;
             }
              this.othersouthwishArea = "" 
            break;
          case "2":
             console.log(oldval)
            for (var property1 in this.northwishAreaobj) {
                 this.northwishAreaobj[property1] = false;
             } 
              this.othernorthwishArea = ""
            break;
          case "4":
             console.log(oldval)
            this.otherArea = "";
            break;
        }
    }
  },
  created() {
    //this.getBeianCompany()
    this.getCompanyInfo();
  },
  methods: {
    getTripName(){
        getTripInfoList(this.listQuery).then(res=>{
          this.tripList =res.datas.list || [];
          console.log(this.tripList)
        })
    },
    getCompanyInfo(){
      getCompanyList(this.listQuery).then(response => {
        this.companyApplyList = response.datas.list || [];
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.ruleForm.companylicence = "";
    },
    handleUploadSuccess(response, file, fileList) {
      console.log(response);
      if (response.code == 200) {
        console.log(response.datas.file_data.file_name);
        this.ruleForm.companylicence = response.datas.file_data.file_name;
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onSubmit() {
      console.log("submit!");
      this.createData();
    },
    reset() {
      this.$refs["ruleForm"].resetFields();
    },
    //总区域校验  
    checkwishAreaobj(){
        if (this.areaid === "1") {
            this.wishAreaobj.南极 =true
        } else{
          if (this.areaid === "2") {
            this.wishAreaobj.北极 =true
          } else {
            if (this.areaid === "3") {
              this.wishAreaobj.加岛 =true
            } else {
              this.wishAreaobj.其他 =true
            }
          }
        }
    },
    checkWishArea() {
      var wishAreaString = "";
      for (
        let index = 0;
        index < Object.keys(this.wishAreaobj).length;
        index++
      ) {
        var wvalue = Object.keys(this.wishAreaobj)[index];
        if (wvalue === '其他') {
          if (this.wishAreaobj[wvalue] === true) {
            wishAreaString = wishAreaString.concat(this.otherArea);
          }
        } else {
          if (this.wishAreaobj[wvalue] === true) {
          wishAreaString = wishAreaString.concat(wvalue);
        }
        }
      }
      this.ruleForm.wishArea = wishAreaString;
    },
    //南极区域字段校验  this.ruleForm.wishSouthArea
    checkwishSorthArea() {
      var wishSorthAreaString = "";
      for (
        let index = 0;
        index < Object.keys(this.southwishAreaobj).length;
        index++
      ) {
        var wsvalue = Object.keys(this.southwishAreaobj)[index];
        if (wsvalue === '其他') {
           if (this.southwishAreaobj[wsvalue] === true) {
            wishSorthAreaString = wishSorthAreaString.concat(this.othersouthwishArea, "|");
          }
        } else {
          if (this.southwishAreaobj[wsvalue] === true) {
          wishSorthAreaString = wishSorthAreaString.concat(wsvalue, "|");
        }
        }
      }
      this.ruleForm.wishSouthArea = wishSorthAreaString;
    },
    //北极区域字段校验  this.ruleForm.wishNorthArea
    checkwishNorthArea() {
      var wishNorthAreaString = "";
      for (
        let index = 0;
        index < Object.keys(this.northwishAreaobj).length;
        index++
      ) {
        var wnvalue = Object.keys(this.northwishAreaobj)[index];
        if (wnvalue === "其他") {
          if (this.northwishAreaobj[wnvalue] === true) {
            wishNorthAreaString = wishNorthAreaString.concat(this.othernorthwishArea, "|");
          }
        } else {
          if (this.northwishAreaobj[wnvalue] === true) {
          wishNorthAreaString = wishNorthAreaString.concat(wnvalue, "|");
        }
        }
      }
      this.ruleForm.wishNorthArea = wishNorthAreaString;
    },
    checkOtherArea() {
      this.ruleForm.wishOtherArea = this.otherArea;
    },
    otherFieldCheck(){
        this.ruleForm.onBoardTime = this.test3;
        this.ruleForm.offBoardTime = this.test4;
    },
    wholecheck(){
      this.otherFieldCheck()
      this.checkwishAreaobj();
      this.checkWishArea();
      this.checkwishSorthArea();
      this.checkwishNorthArea();
      this.checkOtherArea();
    },
    createData() {
      const vm = this;
      this.wholecheck();
      console.log(this.ruleForm)
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          addTrip(vm.ruleForm).then(response => {
            console.log(response);
            if (response.code == 200) {
              this.$notify({
                title: "成功",
                message: "提交成功",
                type: "success",
                duration: 2000
              });
              this.$router.push({ path: "/apply/RouteList" });
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
    },
    updateData() {
      const vm = this;
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          editBeianCompany(vm.ruleForm).then(response => {
            console.log(response);
            if (response.code == 200) {
              this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success",
                duration: 2000
              });
            } else {
              this.$notify({
                title: "修改失败",
                message: "修改失败",
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
}
</style>


<style>
label {
  font-weight: 400 !important;
}
</style>