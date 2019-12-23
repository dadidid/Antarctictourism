<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
        <span>官方行程</span>
        <el-divider></el-divider>
        <el-form-item label="官方行程代码">
          <el-input style="width:30%;"  v-model="ruleForm.code"></el-input>
        </el-form-item>
        <span>游轮</span>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="8">
            <el-form-item label="游轮公司和游轮">
              <el-select placeholder="请选择" v-model="ruleForm.companyId" @change="getTripName">
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
            <el-form-item label="是否豪华船">
              <el-input v-model="isLux" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="载客人数">
              <el-input v-model="ruleForm.seatNumber" disabled></el-input>
              <span></span>
            </el-form-item>
          </el-col>
        </el-row>
        <span>日期</span>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="8">
            <el-form-item label="登船日期">
              <el-date-picker
                v-model="test3"
                style="width:100%;"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下船日期">
              <el-date-picker
                v-model="test4"
                type="date"
                style="width:100%;"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行程天数">
              <el-input v-model="ruleForm.travelDays"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <span>线路</span>
        <el-divider></el-divider>
        <el-row>
          <el-form-item label="意向区域">
            <el-radio v-model="areaid" label="1">南极</el-radio>
            <el-radio v-model="areaid" label="2">北极</el-radio>
            <el-radio v-model="areaid" label="3">加岛</el-radio>
            <el-radio v-model="areaid" label="4">其他</el-radio>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="南极意向区域" v-show="areaid === '1'">
            <el-checkbox
              v-for="(val,key,index) in southwishAreaobj"
              v-model="southwishAreaobj[key]"
            >{{key}}</el-checkbox>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input
              v-model="othersouthwishArea"
              style="width:20%;"
              v-show="southwishAreaobj['其他']"
            ></el-input>
            <span></span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="北极意向区域" v-show="areaid === '2'">
            <el-checkbox
              v-for="(val,key,index) in northwishAreaobj"
              :key="key"
              v-model="northwishAreaobj[key]"
            >{{key}}</el-checkbox>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input
              v-model="othernorthwishArea"
              style="width:20%;"
              v-show="northwishAreaobj['其他']"
            ></el-input>
            <span></span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label>
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
  editTrip,
  getTripInfoById
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
      isLux: "",
      ruleForm: {
        id: "",
        name: "",
        companyId: "",
        shipId: "",
        seatNumber: "",
        onBoardTime: "",
        offBoardTime: "",
        travelDays: "",
        code: "",
        wishArea: "",
        wishNorthArea: "",
        wishSouthArea: "",
        wishOtherArea: ""
      },
      test2: "",
      test3: "",
      test4: "",
      listQuery: {
        pagesize: 10,
        curpage: 1,
        companyId: ""
      },
      tripList: [],
      companyApplyList: [],
      applyed: 0,
      dialogImageUrl: "",
      dialogVisible: false,
      rules: {
        companyname: [
          { required: true, message: "官方行程代码", trigger: "blur" }
        ],
        companyaddress: [
          { required: true, message: "请选择游轮公司和游轮", trigger: "blur" }
        ],
        companyofficeaddress: [
          { required: true, message: "请输入公司运营地址", trigger: "blur" }
        ],
        companytel: [
          { required: true, message: "请输入单位电话", trigger: "blur" },
          {
            validator: validatePhone,
            message: "请输入正确格式的电话号码",
            trigger: "blur"
          }
        ],
        companylicence: [
          { required: true, message: "请上传单位营业执照", trigger: "blur" }
        ],
        applyer: [{ required: true, message: "请输入申请人", trigger: "blur" }],
        applyertel: [
          { required: true, message: "请输入申请人电话", trigger: "blur" },
          {
            validator: checkPhone,
            message: "请输入正确格式的手机号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    test2: function(newval, oldval) {
      getSingleTripInfo(
        newval).then(res => {
        console.log(res);
        this.ruleForm.name = res.datas.company.name;
        this.ruleForm.seatNumber = res.datas.company.seatNumber;
        this.ruleForm.shipId = res.datas.company.id;
        this.ruleForm.companyId =res.datas.company.companyId
        if (res.datas.company.isLux === "1") {
          this.isLux = "是";
        } else {
          this.isLux = "否";
        }
      });
    },
    test3: function(newval, oldval) {
      if (newval !== "") {
        // var dateTime = newval + ' 00:00:00'
        var t3timestamp = new Date(newval).getTime();
        var daystimestamp = new Date(this.test4).getTime() - t3timestamp;
        var days = daystimestamp / 1000 / 60 / 60 / 24;
        console.log(days);
        if (days > 0) {
          this.ruleForm.travelDays = days;
        }
      } else {
        this.ruleForm.travelDays = "";
      }
    },
    test4: function(newval, oldval) {
      if (newval !== "") {
        var t4timestamp = new Date(newval).getTime();
        var daystimestamp = t4timestamp - new Date(this.test3).getTime();
        var days = daystimestamp / 1000 / 60 / 60 / 24;
        console.log(days);
        if (days > 0) {
          this.ruleForm.travelDays = days;
        }
        // this.ruleForm.travelDays =days;
      }
    }
  },
  created() {
    //this.getBeianCompany()
    this.getCompanyInfo();
    // console.log(this.$route.query.id)
    this.getOldTripInfo();
    console.log(this.areaid);
  },
  methods: {
    getOldTripInfo() {
      const tid = this.$route.query.id;
      getTripInfoById(tid).then(res => {
        console.log(res)
        this.ruleForm.id = res.datas.info.id
        this.ruleForm.code = res.datas.info.tripCode;
        this.ruleForm.companyId = res.datas.info.companyId;
        this.ruleForm.name = res.datas.info.shipName;
        this.ruleForm.isLux = res.datas.info.isLux;
        this.ruleForm.seatNumber = res.datas.info.seatNumber;
        this.ruleForm.offBoardTime = res.datas.info.offBoardTime;
        this.ruleForm.onBoardTime = res.datas.info.onBoardTime;
        this.ruleForm.travelDays = res.datas.info.travelDays;
        this.ruleForm.wishArea = res.datas.info.wishArea;
        this.ruleForm.wishNorthArea = res.datas.info.wishNorthArea;
        this.ruleForm.wishOtherArea = res.datas.info.wishOtherArea;
        this.ruleForm.wishSouthArea = res.datas.info.wishSouthArea;
        this.ruleForm.shipId = res.datas.info.shipId;
        this.test1 = res.datas.info.companyName;
        this.test2 = this.ruleForm.name;
        this.test3 = this.ruleForm.onBoardTime;
        this.test4 = this.ruleForm.offBoardTime;
        if (this.ruleForm.isLux === "1") {
          this.isLux = "是";
        } else {
          this.isLux = "否";
        }
        console.log(this.ruleForm.wishArea);
        switch (this.ruleForm.wishArea) {
          case "南极":
            this.areaid = "1";
            const wishSouthAreaArray = this.ruleForm.wishSouthArea.split("|");
            wishSouthAreaArray.pop();
            console.log(wishSouthAreaArray)
            for (let index = 0;index < Object.keys(this.southwishAreaobj).length;index++)
             {
              for (let sindex = 0;sindex < wishSouthAreaArray.length;sindex++) 
              {
                if (wishSouthAreaArray[sindex] === Object.keys(this.southwishAreaobj)[index]) {
                  console.log["ok"];
                  this.southwishAreaobj[Object.keys(this.southwishAreaobj)[index]] = true;
                }
              }
            }
            var newwishSouthAreaArray = wishSouthAreaArray.filter(function(n) {
              return (
                n !== "南极半岛" &&
                n !== "福克兰" &&
                n !== "南乔治亚" &&
                n !== "极圈"
              );
            });
            if (newwishSouthAreaArray.length > 0) {
              this.southwishAreaobj["其他"] = true;
              this.othersouthwishArea = newwishSouthAreaArray[0];
            }
            break;
          case "北极":
            const wishNouthAreaArray = this.ruleForm.wishNorthArea.split("|");
            wishNouthAreaArray.pop();
            for (
              let index = 0;
              index < Object.keys(this.northwishAreaobj).length;
              index++
            ) {
              for (
                let sindex = 0;
                sindex < wishNouthAreaArray.length;
                sindex++
              ) {
                if (
                  wishNouthAreaArray[sindex] ===
                  Object.keys(this.northwishAreaobj)[index]
                ) {
                  this.northwishAreaobj[
                    Object.keys(this.northwishAreaobj)[index]
                  ] = true;
                }
              }
            }
            var newwishNouthAreaArray = wishNouthAreaArray.filter(function(n) {
              return (
                n !== "斯瓦尔巴" &&
                n !== "格陵兰" &&
                n !== "加拿大北部" &&
                n !== "俄罗斯远东"
              );
            });
            if (newwishNouthAreaArray.length > 0) {
              this.northwishAreaobj["其他"] = true;
              this.othernorthwishArea = newwishNouthAreaArray[0];
            }
            this.areaid = "2";
            break;
          case "加岛":
            this.areaid = "3";
            break;
          case "其他":
            this.areaid = "4";
            this.otherArea = this.ruleForm.wishOtherArea;
            break;
        }
        console.log(this.areaid);
      });
    },
   
    getTripName() {
      this.listQuery.companyId = this.ruleForm.companyId
      getTripInfoList(this.listQuery).then(res => {
        this.tripList = res.datas.list || [];
        console.log(this.tripList);
      });
    },
    getCompanyInfo() {
      getCompanyList(this.listQuery).then(response => {
        this.companyApplyList = response.datas.list || [];
        console.log("公司列表",this.companyApplyList)
      });
    },
    onSubmit() {
      this.createData();
    },
    reset() {
      this.$refs["ruleForm"].resetFields();
    },
    //总区域校验
    checkwishAreaobj() {
      if (this.areaid === "1") {
        this.wishAreaobj.南极 = true;
      } else {
        if (this.areaid === "2") {
          this.wishAreaobj.北极 = true;
        } else {
          if (this.areaid === "3") {
            this.wishAreaobj.加岛 = true;
          } else {
            this.wishAreaobj.其他 = true;
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
        if (wvalue === "其他") {
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
        if (wsvalue === "其他") {
          if (this.southwishAreaobj[wsvalue] === true) {
            wishSorthAreaString = wishSorthAreaString.concat(
              this.othersouthwishArea,
              "|"
            );
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
            wishNorthAreaString = wishNorthAreaString.concat(
              this.othernorthwishArea,
              "|"
            );
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
    otherFieldCheck() {
      var newonBoardTime = new Date(this.test3);
      var newoffBoardTime = new Date(this.test4);
      this.ruleForm.onBoardTime =
        newonBoardTime.getFullYear() +
        "-" +
        newonBoardTime.getMonth() +
        "-" +
        newonBoardTime.getDay();
      this.ruleForm.offBoardTime =
        newoffBoardTime.getFullYear() +
        "-" +
        newonBoardTime.getMonth() +
        "-" +
        newonBoardTime.getDay();
    },
    wholecheck() {
      this.otherFieldCheck();
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
          editTrip(vm.ruleForm).then(response => {
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